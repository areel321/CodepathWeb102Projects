import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './routes/Layout.jsx';
import DetailView from './routes/DetailView';
import { Link } from 'react-router-dom';
import Chart from './routes/chart.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />
      <Route path="BreweryDetails/:breweryName" element={<DetailView />} />
      <Route path="/chart" element={<Chart />} /> 
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
          <Link to="/" style={{ color: "white" }}>
            Back to Home
          </Link>
        </main>
      }
    />
  </Routes>
</BrowserRouter>
)
