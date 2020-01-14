import React, { Component } from 'react';
import Spinner from '../Spinner';

export default class Add extends Component {
  state = {
    name: '',
    address: '',
    loading: false
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addStore = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true
    });

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

    this.setState({
      loading: false
    });

    if (res.status === 400) {
      // location exists
      return alert('Store already exists');
    }

    alert('Location added');
    this.props.history.replace('/');
  };

  render() {
    const { loading } = this.state;

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

          {
            loading && <Spinner />
          }
        </form>
      </div>
    );
  }
}
