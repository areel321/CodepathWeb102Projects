import { useState, useEffect } from 'react';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import './App.css';

function App() {
  
  const [data, setData] = useState(null);
  const [banList, setBanList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from the API
  const fetchData = async () => {
      setLoading(true);
      try {
          // Fetch a random post from JSONPlaceholder API
          const response = await fetch(`https://api.harvardartmuseums.org/object?classification=Paintings&&apikey=${ACCESS_KEY}`);
          const post = await response.json();

          // Check if the fetched post's userId is in the ban list
          if (banList.includes(post.userId)) {
              fetchData(); // Fetch again if the item is banned
          } else {
              setData(post.records[Math.floor(Math.random() * post.records.length)]);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          setLoading(false);
      }
  };

  // Function to add item to ban list
  const addToBanList = (value) => {
      if (!banList.includes(value)) {
          setBanList([...banList, value]);
      }
  };

  // UseEffect to fetch initial data
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <>
      <div className='body'>
        <div className='main'>
        <h1>Artwork Randomizer</h1>
        <p>Select an element attribute to no longer see objects of it</p>
        
        {data && (
          <div className='element'>
            <h2>{data.title}</h2>
            <div className='attributes'>
              <button onClick={() => addToBanList(data.pages)}>{data.copyright}</button>
              <button onClick={() => addToBanList(data.date)}>{data.totalpageviews}</button>
              <button onClick={() => addToBanList(data.caption)}>{data.lastupdate}</button>
            </div>
            <img src={data.primaryimageurl}/> 
          </div>
        )}

          <button onClick={fetchData} disabled={loading}>{loading ? 'Loading...' : 'Something new!'}</button>
        </div>

        {banList.length > 0 && (
          <div className='ban'>
            <h2>banned attributes</h2>
            <ul>
             {banList.map((ban, index) => (
                <li key={index}> {ban}</li>
              ))}
            </ul>
          </div> 
      )}

      </div>
    </>
  )
}

export default App
