﻿import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow';

class People extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        currentlyEditing: false,
        currentId: 0

    };

    componentDidMount = () => {
        this.generateTable();
    }

    generateTable = () => {
        this.getAllPeople();
        const { people } = this.state;
        return people.map(p => <PersonRow firstName={p.firstName} lastName={p.lastName} age={p.age}
            onEditClicked={() => this.onEditClicked(p)} onDeleteClicked={() => this.onDeleteClicked(p.id)} />);
    }


    onAddClicked = () => {
        axios.post('/api/people/add', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            })
        }
        )
    };

    getAllPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data });
        })

    };

    onTextChanged = (e) => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    };

    onEditClicked = (person) => {
        const { firstName, lastName, age, id} = person;
        
        this.setState({
            person: {
                firstName: firstName,
                lastName: lastName,
                age: age
            },
            currentlyEditing: true,
            currentId: id

        })
    }

    

    onUpdateClicked = () => {
        axios.post('/api/people/update', { ...this.state.person, id: this.state.currentId }).then(() => {
            this.getAllPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            })
        }
        )

    }
    onDeleteClicked = (id) => {
        
        axios.post('/api/people/delete', {id}).then(() => {
            this.getAllPeople();
        })
    }

    render() {
        const { firstName, lastName, age } = this.state.person;

        return (<>
            <div>
                <input type='text' name='firstName' value={firstName} onInput={this.onTextChanged} className='col-md-2' placeholder='First Name'></input>
                <input type='text' name='lastName' value={lastName} onInput={this.onTextChanged} className='col-md-2' placeholder='Last Name'></input>
                <input type='text' name='age' value={age} onInput={this.onTextChanged} className='col-md-2' placeholder='Age'></input>
                <button className='col-md-2 btn btn-success' onClick={this.onAddClicked}>Add</button>
            </div>

            <br></br>

            <div>
                <table className='table-hover table-bordered table-striped col-md-10'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTable()};
                    </tbody>
                </table>
                {this.state.currentlyEditing ? (
                    <div>
                        <input type='text' name='firstName' value={firstName} onInput={this.onTextChanged} className='col-md-2' placeholder='First Name'></input>
                        <input type='text' name='lastName' value={lastName} onInput={this.onTextChanged} className='col-md-2' placeholder='Last Name'></input>
                        <input type='text' name='age' value={age} onInput={this.onTextChanged} className='col-md-2' placeholder='Age'></input>
                        <button className='col-md-2 btn btn-primary' onClick={() => this.setState({ currentlyEditing: false })}>Cancel</button>
                        <button className='col-md-2 btn btn-primary' onClick={this.onUpdateClicked}>Update</button>
                    </div>
                ) : <div></div>}
            </div>



        </>)
    }

}


export default People;