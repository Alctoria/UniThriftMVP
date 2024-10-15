import React from 'react';

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
    </div>
  );
}

export default ItemCard;