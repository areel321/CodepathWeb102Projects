import React from 'react';

const DataList = ({ data }) => {
  if (data.length === 0) {
    return <p>No data found.</p>;
  }

  return (
    <div>
      <h2>Brewery Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.brewery_type}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.address_1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;

