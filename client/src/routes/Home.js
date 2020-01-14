import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

export default class Home extends Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2luZ2VsaXNoYSIsImEiOiJjazVkb3lubGswY2loM29vMzVkNWV1a3Y5In0.nkxgiiw4liuz4rDm4GgJEw';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

  render() {
    return (
      <div>
        <Link to="/add">Add Location</Link>

        <div id="map" style={{
          width: "100%",
          height: "70vh",
          borderRadius: "5px"
        }}>

        </div>
      </div>
    );
  }
}
