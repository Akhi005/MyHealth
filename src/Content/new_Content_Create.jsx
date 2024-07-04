import React, { useEffect, useState } from 'react';
import axios from 'axios';

const new_Content_Create = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://myhealth-server-side-akhi005-akhis-projects.vercel.app/content/:name');
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
       
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.about}</p>
                        <p>{item.symptomps}</p>
                        <p>{item.prevent}</p>
                        <p>{item.medicine}</p>
                        <p>{item.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default new_Content_Create;