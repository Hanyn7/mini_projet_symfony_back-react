import React, { Component } from 'react';
import axios from 'axios';
import EmployeeService from '../services/EmployeeService';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';


class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
      comments: [],
      author: '',
      content: ''
    };

    this.handleCommentNameChange = this.handleCommentNameChange.bind(this);
    this.handleCommentContentChange = this.handleCommentContentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id)
      .then(res => {
        this.setState({ employee: res.data });

        axios.get("http://127.0.0.1:8000/comment/get/" + res.data.id)
          .then(response => {
            this.setState({ comments: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleCommentNameChange(event) {
    this.setState({ author: event.target.value });
  }

  handleCommentContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleCommentSubmit(event) {
    event.preventDefault();
  
    const { author, content, employee } = this.state;
  
    const commentData = {
      author: author,
      content: content,
      post_id: employee.id // Use "id" instead of "post_Id"
    };
     // Call the API to submit the comment
     EmployeeService.createComment(commentData)
     .then(res => {
       // Update the comments state with the newly added comment
       const newComment = res.data;
       this.setState(prevState => ({
         comments: [...prevState.comments, newComment],
         author: '',
         content: ''
         
       }));
     })
     .catch(error => {
       console.log(error);
     });
 }
 deleteComment(commentId) {
    EmployeeService.deleteCom(commentId)
      .then(() => {
        this.setState(prevState => ({
          comments: prevState.comments.filter(comment => comment.id !== commentId)
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

 render() {
    return (
        <div className="container">
          <div className="row mt-3">
            <div className="col-12">
              <div className="card">
                <h3 className="card-header text-center">View Post Details</h3>
                <div className="card-body">
                  <div className="row">
                    <label className="col-4 col-form-label">Title:</label>
                    <div className="col-8"> <h3>{this.state.employee.title}</h3></div>
                  </div>
                  <div className="row">
                    <label className="col-4 col-form-label">Content:</label>
                    <div className="col-8">{this.state.employee.content}</div>
                  </div>
                  <div className="row">
                    <label className="col-4 col-form-label">Category:</label>
                    <div className="col-8"><h3>{this.state.employee.category}</h3></div>
                  </div>
                  <div className="row mt-3">
  <div className="col-12">
    {/* Display existing comments */}
    {this.state.comments.map((comment) => (
      <div key={comment.id} className="card mb-3">
        <div
          className="card-body"
          style={{
            backgroundColor: '#272727',
            color: '#ffffff',
            padding: '20px',
            borderRadius: '30px'
          }}
        >
          <h5
            className="card-title"
            style={{ fontWeight: 'bold', marginBottom: '10px' }}
          >
            {comment.author}
          </h5>
          <pre
            style={{
              margin: '0',
              overflowX: 'auto',
              backgroundColor: '#1e1e1e',
              padding: '10px',
              borderRadius: '30px',
              fontFamily: 'Consolas, monospace',
              color: '#ffffff',
            }}
          >
            <code>{comment.content}</code>
          </pre>
          <button
            className="btn btn-danger"
            style={{ marginTop: '10px' }}
            onClick={() => this.deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

                  {/* Comment form */}
                  <div className="row mt-3">
                    <div className="col-12">
                      <form onSubmit={this.handleCommentSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            value={this.state.author}
                            onChange={this.handleCommentNameChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <textarea

                            className="form-control"
                            placeholder="Your Comment"
                            value={this.state.content}
                            onChange={this.handleCommentContentChange}
                            required
                          > </textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Add Comment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                </div>
                </div>
                </div>
                </div>)}}
           



export default ViewEmployeeComponent;
