import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import EmployeeService from '../services/EmployeeService';

const UpdatePostComponent = (props) => {
  const history = useHistory(); // Initialize useHistory hook
  const postId = props.match.params.id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    EmployeeService.getEmployeeById(postId)
      .then((res) => {
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const updatePost = (e) => {
    e.preventDefault();
    const post = {
      title: title,
      content: content,
      category: category
    };

    EmployeeService.updateEmployee(post, postId)
      .then((res) => {
        console.log(res);
        history.push('/'); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
    <h3>Update Post</h3>
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
      <button className="btn btn-primary" onClick={updatePost} >
        Update
      </button>
    </form>
  </div>
  );
};

export default UpdatePostComponent;
