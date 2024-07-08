// PropertyDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/properties/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch property ${id}`);
        }
        const propertyData = await response.json();
        setProperty(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="container">
      <h1>{property.name}</h1>
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
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
