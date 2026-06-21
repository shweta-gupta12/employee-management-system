import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props){

        super(props)

        this.state = {
            //step-2
            id: props.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    //step-3
    componentDidMount(){

        //step-4
        if(this.state.id == -1){
            return
        }
        else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) => {
                    let employee = res.data;
                    this.setState( {firstName: employee.firstName,
                        lastName: employee.lastName,
                        emailId: employee.emailId
    
                    });
            });

        }
                
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => '+ JSON.stringify(employee));

        //step-5
        if(this.state.id == -1){
            EmployeeService.createEmployee(employee).then(res => {
                window.location.href = "/employees";
            })
        }
        else{
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                            window.location.href = "/employees";
            });

        }
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel = () => {
        window.location.href = "/employees";
    }

    getTitle(){
        if(this.state.id == -1){
            return <h3 className="text-center">Add Employee</h3>
        }
        else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div><br/><br/>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name : </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name : </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id : </label>
                                        <input placeholder="Email Id" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>

                                    <button type="button" className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button type="button" className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//step-6
function CreateEmployeeWrapper() {
    const { id } = useParams();
    return <CreateEmployeeComponent id={id} />;
}

export default CreateEmployeeWrapper;