import { useState, useEffect } from 'react';
import api from '../services/api';

function useApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint, { headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading };
}

export default useApi;
