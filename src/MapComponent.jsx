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
