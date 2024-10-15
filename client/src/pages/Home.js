import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('/api/items');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items for Sale</h1>
      {items.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}

export default Home;