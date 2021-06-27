import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      userdatas: [],
      id: '',
      update: false,
    };
  }

  //add to records
  addRecord = () => {
    Axios.post('https://crud-app-using-mysql.herokuapp.com/create', {
      name: this.state.name,
      password: this.state.password,
    }).then(() => {
      this.setState({ name: '', password: '' });
      alert('Success');
    });
  };
  //show all data
  getDatas = () => {
    Axios.get('https://crud-app-using-mysql.herokuapp.com/view').then(
      response => {
        this.setState({ userdatas: response.data });
      }
    );
  };
  //edit
  editRecord = id => {
    Axios.get(`https://crud-app-using-mysql.herokuapp.com/view/${id}`).then(
      result => {
        this.setState({
          id: id,
          update: true,
          name: result.data[0].name,
          password: result.data[0].password,
        });
      }
    );
  };
  updateRecord = () => {
    Axios.put('https://crud-app-using-mysql.herokuapp.com/update', {
      id: this.state.id,
      name: this.state.name,
      password: this.state.password,
    }).then(result => {
      this.setState({
        id: '',
        update: false,
        name: '',
        password: '',
      });
      alert('Values updated');
    });
  };
  deleteRecord = id => {
    Axios.delete(
      `https://crud-app-using-mysql.herokuapp.com/delete/${id}`
    ).then(response => {
      this.setState();
    });
    alert('Data deleted');
  };
  render() {
    return (
      <div className='container'>
        <h1>Crud App Using MYSQL</h1>
        <div className='input'>
          <label>Name: </label>
          <input
            type='text'
            placeholder='Enter your name'
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />

          <label>Password: </label>
          <input
            type='text'
            placeholder='Password'
            value={this.state.password}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
          {this.state.update === true ? (
            <button onClick={this.updateRecord}>Update</button>
          ) : (
            <button onClick={this.addRecord}>Submit </button>
          )}
        </div>
        <div className='show-data'>
          <button onClick={this.getDatas}>Show all</button>
        </div>
        <div className='output'>
          {this.state.userdatas.map((val, key) => {
            return (
              <div key={Math.floor(Math.random * 1000)} className='results'>
                <label>Id : {val.id}</label>

                <label>Name : {val.name}</label>

                <label>Password : {val.password}</label>

                <button
                  className='edit'
                  onClick={() => {
                    this.editRecord(val.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className='delete'
                  onClick={() => {
                    this.deleteRecord(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;
