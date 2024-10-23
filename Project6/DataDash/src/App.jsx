import React, { useEffect, useState } from 'react';
import DataList from './DataList';
import beerMug from './assets/beer-mug-graphic-clipart-design-free-png.webp'
import './App.css';
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import Dashboard from './Dashboard';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateSearchTerm, setStateSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

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

  // Handling search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStateSearch = (event) => {
    setStateSearchTerm(event.target.value);
  };

  // Handling filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Summary statistics
  const filteredData = data.filter(item =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brewery_type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (item.brewery_type === filter || filter === '') &&
    (item.state.toLowerCase().includes(stateSearchTerm.toLowerCase()) || stateSearchTerm === '')
  );

  

  return (
    <div>
      <Dashboard/>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select value={filter} onChange={handleFilterChange}>
            <option value="">All Types</option>
              <option value="micro">Micro</option>
              <option value="nano">Nano</option>
              <option value="brewpub">Brewpub</option>
              <option value="regional">Regional</option>
              <option value="contract">Contract</option>
              <option value="brewery">Brewery</option>
            </select>
            <input
              type="text"
              placeholder="Filter by state"
              value={stateSearchTerm}
              onChange={handleStateSearch}
            />
          </div>
          <DataList data={filteredData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
        </>
      )}
    </div>
  );
};

export default App;

