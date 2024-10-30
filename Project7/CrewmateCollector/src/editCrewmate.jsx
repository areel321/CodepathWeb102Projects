import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './client';

const EditCrewmate = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setName(data.name);
      setAttribute(data.attribute);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('crewmates')
      .update({ name, attribute })
      .eq('id', id);

    if (!error) {
      navigate('/');
    } else {
      console.error(error);
    }
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
      <button type="submit">Update Crewmate</button>
    </form>
  );
};

export default EditCrewmate;
