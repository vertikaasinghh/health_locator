<<<<<<< HEAD
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useCurrentLocation from './useCurrentLocation'; // Import the hook

function MapComponent({ onMapLoad, selectedHospital }) {
  const mapContainer = useRef(null);
  const location = useCurrentLocation(); // Use the hook to get the current location
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Ensure you have the correct style URL
      center: [76.305, 10.005], // Default center adjusted to a more central location
      zoom: 12
    });

    map.current.on('load', () => {
      onMapLoad(map.current);

      // Check if location is loaded and has coordinates
      if (location.loaded && location.coordinates.lat && location.coordinates.lng) {
        new mapboxgl.Marker()
          .setLngLat([location.coordinates.lng, location.coordinates.lat])
          .addTo(map.current);

        // Optionally, re-center the map on the new marker
        map.current.flyTo({
          center: [location.coordinates.lng, location.coordinates.lat],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      }

      if (selectedHospital) {
        // Remove existing marker if there is one
        if (marker.current) {
          marker.current.remove();
        }

        // Create a new marker and add it to the map
        marker.current = new mapboxgl.Marker()
          .setLngLat([selectedHospital.Longitude, selectedHospital.Latitude])
          .addTo(map.current);

        // Fly to the hospital's location
        map.current.flyTo({
          center: [selectedHospital.Longitude, selectedHospital.Latitude],
          essential: true,
          zoom: 15
        });
      }
    });

    // Handle missing images
    map.current.on('styleimagemissing', (e) => {
      const id = e.id;
      if (id === 'in-state-4') {
        map.current.loadImage('path_to_your_image', (error, image) => {
          if (error) throw error;
          map.current.addImage(id, image);
        });
      }
    });

    return () => map.current.remove();
  }, [onMapLoad, location, selectedHospital]); // Include location and selectedHospital in the dependency array

  return <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }}></div>;
}

export default MapComponent;

=======
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useCurrentLocation from './useCurrentLocation'; // Import the hook

function MapComponent({ onMapLoad }) {
  const mapContainer = useRef(null);
  const location = useCurrentLocation(); // Use the hook to get the current location

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Ensure you have the correct style URL
      center: [80.2707, 13.0827], // Default center on the map
      zoom: 12
    });

    map.on('load', () => {
      onMapLoad(map);

      // Check if location is loaded and has coordinates
      if (location.loaded && location.coordinates.lat && location.coordinates.lng) {
        new mapboxgl.Marker()
          .setLngLat([location.coordinates.lng, location.coordinates.lat])
          .addTo(map);

        // Optionally, re-center the map on the new marker
        map.flyTo({
          center: [location.coordinates.lng, location.coordinates.lat],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      }
    });

    return () => map.remove();
  }, [onMapLoad, location]); // Include location in the dependency array

  return <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }}></div>;
}

export default MapComponent;
>>>>>>> 976382c56f19953a74261410183c5908e7b9b16f
