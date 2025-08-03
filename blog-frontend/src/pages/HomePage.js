import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import BlogCard from '../components/BlogCard';

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/blogs')
      .then(res => {
        setBlogs(res.data.content); // ✅ Fix: use content from paginated response
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs", err);
        setError("Failed to load blogs");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home">
      <h1>All Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
}

export default HomePage;
