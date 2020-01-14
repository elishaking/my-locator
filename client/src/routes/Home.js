import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

export default class Home extends Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2luZ2VsaXNoYSIsImEiOiJjazVkb3lubGswY2loM29vMzVkNWV1a3Y5In0.nkxgiiw4liuz4rDm4GgJEw';

    this.getLocations();
  }

  getLocations = async () => {
    const res = await fetch('/api/v1/locations');
    const data = await res.json();

    const locations = data.data.map((location) => {
      const { coordinates } = location.location;
      return {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [
            coordinates[0],
            coordinates[1]
          ]
        },
        'properties': {
          'id': location.id,
          'icon': 'shop'
        }
      };
    });

    this.loadMap(locations);
  };

  loadMap = (locations) => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    map.on('load', () => {
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': locations
          }
        },
        layout: {
          'icon-image': '{icon}-15',
          'icon-size': 1.5,
          'text-field': '{id}',
          'text-offset': [0, .9],
          'text-anchor': 'top'
        }
      });
    });
  };

  render() {
    return (
      <div>
        <Link className="btn" to="/add">Add Location</Link>

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
