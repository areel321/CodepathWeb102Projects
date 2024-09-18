import './App.css';
import rainbowHeart from './assets/rainbowHeart.jpg';
import BarCards from './components/barCards';

function App() {
  
  return (

    <div className="App">
      <div id="titleBar">
        <h1>USA Lesbian Bars</h1>
        <img src={rainbowHeart} id="img" alt="Rainbow Heart"/>
        <div id="titleDesc">
          <h2>All lesbian bars in the USA</h2>
          <h2>Let's find our community❤️</h2>
        </div>
      </div>
      <BarCards />
    </div>
    
  )
}

export default App;
