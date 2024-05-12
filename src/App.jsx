import React from 'react';
import MapComponent from './MapComponent';
import IsochroneLayer from './IsochroneLayer';
import useCurrentLocation from './useCurrentLocation';

const App = () => {
  const location = useCurrentLocation();

  return (
    <div>
      <MapComponent onMapLoad={map => (
        <>
          <IsochroneLayer map={map} location={location} minutes={10} mode="walking" />
          <IsochroneLayer map={map} location={location} minutes={20} mode="driving" />
        </>
      )} />
    </div>
  );
};

export default App;
