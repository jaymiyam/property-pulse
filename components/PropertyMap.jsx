'use client';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const PropertyMap = ({ address }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // ID of the div to render the map
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.0589, 42.3601],
      zoom: 13,
    });

    fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
        address
      )}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length === 0) {
          return;
        }
        const [lng, lat] = data.features[0].geometry.coordinates;

        // set map center to the address coordinates
        map.setCenter([lng, lat]);
        map.setZoom(15);

        // add a marker for the address
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      })
      .catch((err) => {
        console.error('Error fetching geocode', err);
      })
      .finally(() => {});

    return () => map.remove();
  }, [address]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default PropertyMap;
