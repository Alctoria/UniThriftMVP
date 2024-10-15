import React, { useState } from 'react';
import axios from 'axios';

function PostItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description || !price) {
      setError('Please fill in all required fields');
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError('Price must be a positive number');
      return;
    }

    try {
      await axios.post('/api/items', { title, description, price, imageUrl }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setSuccess('Item posted successfully!');
      // Clear form fields
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Post New Item</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{color: 'red'}}>{error}</p>}
        {success && <p style={{color: 'green'}}>{success}</p>}
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input 
            type="number" 
            id="price"
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL (optional):</label>
          <input 
            type="text" 
            id="imageUrl"
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
          />
        </div>
        <button type="submit">Post Item</button>
      </form>
    </div>
  );
}

export default PostItem;