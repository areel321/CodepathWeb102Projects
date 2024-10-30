import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './client';

const CrewmateDetail = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

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
      setCrewmate(data);
    }
  };

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p>Attribute: {crewmate.attribute}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default CrewmateDetail;
