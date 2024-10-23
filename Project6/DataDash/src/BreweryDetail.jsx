import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY; // Ensure you're using this if needed.

const BreweryDetails = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries?by_name=${encodeURIComponent(params.breweryName)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        if (jsonData.length > 0) {
          setFullDetails(jsonData[0]);
        } else {
          setError('No brewery found');
        }
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.breweryName]);

  

  
  if (!fullDetails) {
    return null; // Handle the case where fullDetails is null, though we should be covered by the error state.
  }

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
      <h1>{fullDetails.name}</h1>

      <h2>Address:</h2>
      <p>{fullDetails.street}</p>
      <p>{fullDetails.city}, {fullDetails.state}</p>
      <p>{fullDetails.zip}</p>
      <h2>Type:</h2>
      <p>{fullDetails.brewery_type}</p>
      <h2>Contact:</h2>
      <p>{fullDetails.phone}</p>
      <p>{fullDetails.website}</p>
      </>)}
    </div>
  );
};

export default BreweryDetails;