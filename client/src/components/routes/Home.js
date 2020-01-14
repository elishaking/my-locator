import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import Spinner from '../Spinner';

export default class Home extends Component {
  state = {
    loading: true
  };

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
          'id': location.name,
          'icon': 'shop'
        }
      };
    });

    this.loadMap(locations);
  };

  getLocationsCenter = (locations) => {
    const N = locations.length;
    if (N === 0) return [0, 0];

    const sum = locations.reduce((total, loc) => {
      const coord = loc.geometry.coordinates;
      total[0] += coord[0]
      total[1] += coord[1];
      return total;
    }, [0, 0]);

    return [sum[0] / N, sum[1] / N];
  };

  loadMap = (locations) => {
    const mapCenter = this.getLocationsCenter(locations);

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 3,
      center: mapCenter
    });

    map.on('load', () => {
      this.setState({ loading: false });

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
    const { loading } = this.state;
    return (
      <div>
        <Link className="btn" to="/add">Add Location</Link>

        <div className="map-container">
          <div id="map" style={{
            width: "100%",
            height: "70vh",
            borderRadius: "5px",
            visibility: loading ? 'hidden' : 'visible'
          }}>
          </div>

          {
            loading && <Spinner className="spinner-container" />
          }
        </div>
      </div>
    );
  }
}
