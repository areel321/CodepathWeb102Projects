import React, { useState } from 'react';
import { supabase } from './client';
import { useNavigate } from 'react-router-dom';


const CrewmateForm = () => {
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, attribute }]);

    if (!error) {
      navigate('/');
    } else {
      console.error(error);
    }

    setName('');
    setAttribute('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Crewmate Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <select value={attribute} onChange={(e) => setAttribute(e.target.value)} required>
        <option value="">Select Attribute</option>
        <option value="Pilot">Pilot</option>
        <option value="Engineer">Engineer</option>
        <option value="Navigator">Navigator</option>
      </select>
      <button type="submit">Add Crewmate</button>
    </form>
  );
};

export default CrewmateForm;


