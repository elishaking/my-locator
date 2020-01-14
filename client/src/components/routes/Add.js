import React, { Component } from 'react';

export default class Add extends Component {
  state = {
    name: '',
    address: ''
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addStore = async (e) => {
    e.preventDefault();

    const { name, address } = this.state;
    if (name === '' || address === '')
      return alert('All fields are required');
    const newLocation = {
      name,
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
      // location exists
      return alert('Store already exists');
    }

    alert('Location added');
    this.props.history.replace('/');
  };

  render() {
    return (
      <div className="add">
        <form className="form" onSubmit={this.addStore}>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={this.onChange} />

          <input
            type="text"
            name="address"
            placeholder="address"
            onChange={this.onChange} />

          <button className="btn" type="submit">Add</button>
        </form>
      </div>
    );
  }
}
