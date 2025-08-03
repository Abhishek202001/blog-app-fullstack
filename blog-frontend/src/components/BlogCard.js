import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  const title = blog?.title || "No Title";
  const description = blog?.content || "No content available.";

  return (
    <div className="blog-card" style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description}>
        {description.length > 150 ? description.slice(0, 150) + '...' : description}
      </p>
      <Link to={`/blogs/${blog.id}`} style={styles.link}>Read More</Link>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9'
  },
  title: {
    margin: '0 0 0.5rem 0',
  },
  description: {
    fontSize: '0.95rem',
    color: '#444',
  },
  link: {
    display: 'inline-block',
    marginTop: '0.5rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default BlogCard;
