import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const ChartView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate number of breweries by type
    const typeCounts = data.reduce((acc, brewery) => {
        const type = brewery.brewery_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    // Prepare data for the chart
    const chartData = Object.keys(typeCounts).map(type => ({
        name: type,
        count: typeCounts[type],
    }));

    return (
        <div>
            {loading ? (
                <p>Loading chart data...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <h3>Brewery Types Chart</h3>
                    <ResponsiveContainer width= {500} height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#BDB76B" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p>Data of amount of each type of brewery</p>
                </div>
            )}
        </div>
    );
};

export default ChartView;