// Property.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Property.css'; // Import CSS file

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const propertyData = await response.json();
        setProperties(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (properties.length === 0) return <p>No properties found.</p>;

  return (
    <div className="container">
      <h1>Properties</h1>
      <div className="row">
        {properties.map(property => (
          <div key={property.id} className="col-md-4 mb-3">
            <Link to={`/property/${property.id}`} className="card-link">
              <div className="card">
                <img
                  src={`http://localhost:5000/images/${property.imageUrl}`} // Adjust path as per your API response
                  className="card-img-top"
                  alt={property.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.name}</h5>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
