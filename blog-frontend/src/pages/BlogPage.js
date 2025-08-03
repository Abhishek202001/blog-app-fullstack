import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import './BlogPage.css'; 

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error("Error loading blog", err));
  }, [id]);

  if (!blog) return <p className="loading">Loading...</p>;

  return (
    <div className="blog-page">
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-description"><strong>Description:</strong> {blog.description}</p>
      <hr className="divider" />
      <p className="blog-content-label"><strong>Content:</strong></p>
      <div className="blog-content">{blog.content}</div>
    </div>
  );
}

export default BlogPage;
