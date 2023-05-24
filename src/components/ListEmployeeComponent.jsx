import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      searchKeyword: ''
    };

    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.filterEmployeesByTitle = this.filterEmployeesByTitle.bind(this);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then(res => {
      this.setState({
        employees: this.state.employees.filter(employee => employee.id !== id)
      });
    });
  }

  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  editEmployee(id) {
    this.props.history.push(`/edit-employee/${id}`);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then(res => {
      this.setState({ employees: res.data });
    });
  }

  addEmployee() {
    this.props.history.push('/add-employee/_add');
  }

  handleSearchChange(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  filterEmployeesByTitle() {
    const { employees, searchKeyword } = this.state;
    if (searchKeyword.trim() === '') {
      return employees;
    } else {
      return employees.filter(employee =>
        employee.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
  }

  render() {
    const filteredEmployees = this.filterEmployeesByTitle();

    return (
        <div class="container">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Posts List</h2>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 text-center">
                <button class="btn btn-primary" onClick={this.addEmployee}>
                  Add Post
                </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-12">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by title"
                    value={this.state.searchKeyword}
                    onChange={this.handleSearchChange}
                  />
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-12">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.title}</td>
                        <td>{employee.category}</td>
                        <td>
                          <button
                            onClick={() => this.editEmployee(employee.id)}
                            class="btn btn-info mr-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => this.deleteEmployee(employee.id)}
                            class="btn btn-danger mr-2"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => this.viewEmployee(employee.id)}
                            class="btn btn-info"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );      
  }
}

export default ListEmployeeComponent;
