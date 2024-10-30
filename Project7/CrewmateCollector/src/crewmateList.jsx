import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './client';
import "./crewmateList.css";
const CrewmateList = () => {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase.from('crewmates').select();
    if (error) {
      console.error(error);
      return;
    }
    setCrewmates(data || []);
  };

  const deleteCrewmate = async (id) => {
    await supabase.from('crewmates').delete().eq('id', id);
    fetchCrewmates();
  };

  const calculatePercentages = () => {
    const total = crewmates.length;
    const attributeCounts = crewmates.reduce((acc, { attribute }) => {
      acc[attribute] = (acc[attribute] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(attributeCounts).map(([attribute, count]) => ({
      attribute,
      percentage: ((count / total) * 100).toFixed(2),
    }));
  };
  
  return (
    <div>
      <h2>Crewmate List</h2>
      <h3>Total Crewmates: {crewmates.length}</h3>
      <h4>Attribute Percentages:</h4>
          <ul>
            {calculatePercentages().map(({ attribute, percentage }) => (
              <li key={attribute}>
                {attribute}: {percentage}%
              </li>
            ))}
          </ul>
      <Link to="/add">Add Crewmate</Link>
      <ul>
        {crewmates.map((crewmate) => (
          <li key={crewmate.id}>
            <Link to={`/crewmates/${crewmate.id}`}>{crewmate.name}</Link>
            <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
            <Link to={`/edit/${crewmate.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrewmateList;

