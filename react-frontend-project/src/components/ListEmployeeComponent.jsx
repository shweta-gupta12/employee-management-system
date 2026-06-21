import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        //rest api
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !==id)});
        });

    }

    viewEmployee(id){
        window.location.href = `/view-employee/${id}`;
    }

    editEmployee(id){
        window.location.href = `/add-employee/${id}`;
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});

        });

    }

    addEmployee(){
         window.location.href = "/add-employee/-1";
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employee List</h2>
                <div>
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                </div>
                <div className="row">
                    <table className= "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key = {employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td>
                                                <button type="button" onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                                <button type="button" onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger" style={{marginLeft:"10px"}}>Delete</button>
                                                <button type="button" onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info" style={{marginLeft:"10px"}}>View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;