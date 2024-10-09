import { useState } from 'react';
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
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 100) + 1}`);
          const post = await response.json();

          // Check if the fetched post's userId is in the ban list
          if (banList.includes(post.userId)) {
              fetchData(); // Fetch again if the item is banned
          } else {
              setData(post);
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
        
        {data && (
          <div className='element'>
            <h2>Name here</h2>
            <div className='attributes'>
              <button onClick={() => addToBanList(data.title)}>{data.title}</button>
              <button onClick={() => addToBanList(data.userId)}>{data.userId}</button>
              <button onClick={() => addToBanList(data.body)}>{data.body}</button>
            </div>
            <img></img> 
          </div>
        )}

          <button onClick={fetchData} disabled={loading}>{loading ? 'Loading...' : 'Something new!'}</button>
        </div>

        {banList.length > 0 && (
          <div className='ban'>
            <h2>banned attributes</h2>
            <ul>
             {banList.map((ban, index) => (
                <li key={index}>User ID {ban}</li>
              ))}
            </ul>
          </div> 
      )}

      </div>
    </>
  )
}

export default App
