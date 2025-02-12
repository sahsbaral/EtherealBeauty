import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from "../../utils/baseURL";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/products/display_all_vendors`);
        setVendors(response.data);
      } catch (err) {
        setError("Error fetching vendors");
        console.error("Error fetching vendors:", err);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="vendors-container p-6">
      <h2 className="text-2xl font-bold">Vendors</h2>
      
      {/* Display error message if there is an error */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="vendors-list mt-4">
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <div key={vendor.vendor_id} className="vendor-card bg-pink-200 p-4 rounded-md shadow-lg mb-4">
              <h3 className="text-lg font-semibold">{vendor.vendorName}</h3>
              <p><strong>Owner Name:</strong> {vendor.ownerName}</p>
              <p><strong>Email Address:</strong> {vendor.emailAddress}</p>
              <p><strong>Phone Number:</strong> {vendor.phoneNo}</p>
              <p><strong>Business Name:</strong> {vendor.businessName}</p>
              <p><strong>Business Registration Number:</strong> {vendor.businessRN}</p>
              <p><strong>Business Address:</strong> {vendor.businessAddress}</p>
              <p><strong>Citizenship:</strong> {vendor.citizenShip}</p>
              <p><strong>Terms Accepted:</strong> {vendor.termsAccepted ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {new Date(vendor.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(vendor.updatedAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No vendors found.</p>
        )}
      </div>
    </div>
  );
}

export default Vendors;