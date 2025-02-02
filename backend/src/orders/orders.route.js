const express = require('express');
const Order = require('./orders.model');
//const { EsewaPaymentGateway, EsewaCheckStatus } = require('esewajs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url:
        'https://www.protonier.xyz/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://www.protonier.xyz/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Confirm Payment
router.post('/confirm-payment', async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    });

    const paymentIntentId = session.payment_intent.id;

    let order = await Order.findOne({ where: { orderId: paymentIntentId } });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));

      const amount = session.amount_total / 100;

      order = await Order.create({
        orderId: paymentIntentId,
        products: lineItems,
        amount,
        email: session.customer_details.email,
        status: session.payment_intent.status === 'succeeded' ? 'pending' : 'failed',
      });
    } else {
      order.status = session.payment_intent.status === 'succeeded' ? 'pending' : 'failed';
      await order.save();
    }

    res.json({ order });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

// Get orders by email
router.get('/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const orders = await Order.findAll({ where: { email }, order: [['createdAt', 'DESC']] });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this email' });
    }

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single order
router.get('/order/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/update-order-status/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an order
router.delete('/delete-order/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();

    res.json({ message: 'Order deleted successfully', order });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
