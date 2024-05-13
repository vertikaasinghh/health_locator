<<<<<<< HEAD
import React, { useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const IsochroneLayer = ({ map, location, minutes, mode }) => {
    useEffect(() => {
        if (!map || !location) return;

        const isochroneSourceId = `isochrone-${mode}-${minutes}`;
        if (!map.getSource(isochroneSourceId)) {
            map.addSource(isochroneSourceId, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });
        }
        const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
        mapboxgl.accessToken = mapboxToken;

        const url = `https://api.mapbox.com/isochrone/v1/mapbox/${mode}/${location.longitude},${location.latitude}?contours_minutes=${minutes}&access_token=${mapboxgl.accessToken}`;

        axios.get(url)
            .then(response => {
                map.getSource(isochroneSourceId).setData(response.data);
            })
            .catch(error => console.error('Error fetching isochrones: ', error));

    }, [map, location, minutes, mode]); // Dependencies

    return (
      <div>
        {nearbyHospitals.length > 0 ? (
          nearbyHospitals.map(hospital => <div key={hospital.id}>{hospital.name}</div>)
        ) : (
          <p>No hospitals found within 10 minutes range.</p>
        )}
      </div>
    );
};

export default IsochroneLayer;

=======
import React, { useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const IsochroneLayer = ({ map, location, minutes, mode }) => {
    useEffect(() => {
        if (!map || !location) return;

        const isochroneSourceId = `isochrone-${mode}-${minutes}`;
        if (!map.getSource(isochroneSourceId)) {
            map.addSource(isochroneSourceId, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });
        }
        const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
        mapboxgl.accessToken = mapboxToken;

        const url = `https://api.mapbox.com/isochrone/v1/mapbox/${mode}/${location.longitude},${location.latitude}?contours_minutes=${minutes}&access_token=${mapboxgl.accessToken}`;

        axios.get(url)
            .then(response => {
                map.getSource(isochroneSourceId).setData(response.data);
            })
            .catch(error => console.error('Error fetching isochrones: ', error));

    }, [map, location, minutes, mode]); // Dependencies

    return null;
};

export default IsochroneLayer;

>>>>>>> 976382c56f19953a74261410183c5908e7b9b16f
