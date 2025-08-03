// src/pages/EditBlog.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`/blogs/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(err => console.error("Error loading blog", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`/blogs/${id}`, { title, description })
      .then(() => navigate(`/blogs/${id}`))
      .catch(err => console.error("Error updating blog", err));
  };

  return (
    <div className="edit">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={title}
          onChange={(e) => setTitle(e.target.value)} required />
        <textarea value={description}
          onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditBlog;
