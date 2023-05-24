import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
  const history = useHistory(); // Initialize useHistory hook
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const savePost = (e) => {
    e.preventDefault();
    const post = {
      title: title,
      content: content,
      category: category
    };

    EmployeeService.createEmployee(post)
      .then((res) => {
        console.log(res);
        history.push('/'); // Redirect to specified URL
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
    <h3>Create Post</h3>
    <form>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          className="form-control"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          className="form-control"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={savePost}>
        Create
      </button>
    </form>
  </div>
  );
};

export default CreateEmployeeComponent;
