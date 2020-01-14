import React, { Component } from 'react';

export default class Add extends Component {
  state = {
    id: '',
    address: ''
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addStore = async (e) => {
    e.preventDefault();

    const { id, address } = this.state;
    if (id === '' || address === '')
      return alert('All fields are required');
    const newLocation = {
      id,
      address
    };

    const res = await fetch('/api/v1/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLocation)
    });

    if (res.status === 400) {
      // store exists
      return alert('Store already exists');
    }

    alert('Store added');
    this.props.history.replace('/');
  };

  render() {
    return (
      <div>
        <form onSubmit={this.addStore}>
          <input
            type="text"
            name="id"
            placeholder="location id"
            onChange={this.onChange} />

          <input
            type="text"
            name="address"
            placeholder="address"
            onChange={this.onChange} />

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
