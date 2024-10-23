import React, { useEffect, useState } from 'react';
import DataList from './DataList'; // If you'll use this later, make sure to include it in your JSX.
import beerMug from './assets/beer-mug-graphic-clipart-design-free-png.webp';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Fetching data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.openbrewerydb.org/breweries'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const uniqueStates = [...new Set(data.map(item => item.state))].length;
    const uniqueCities = [...new Set(data.map(item => item.city))].length;

    return (
        <div>
            <h1>Data Dashboard</h1>
            <img className="img" src={beerMug} alt="Beer Mug" />
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                    <h3>Total Breweries: {data.length}</h3>
                    <h3>States Represented: {uniqueStates}</h3>
                    <h3>Cities Represented: {uniqueCities}</h3>
                </>
            )}
        </div>
    );
};

export default Dashboard;