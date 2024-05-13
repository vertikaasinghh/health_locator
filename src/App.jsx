<<<<<<< HEAD
import React, { useState } from 'react';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import jsonData from './dataset.json';

const App = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const hospitals = jsonData.Sheet1;  // Access the nested array

  const handleSearch = (searchTerm) => {
    const hospital = hospitals.find(hospital => hospital.Hospital_Name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSelectedHospital(hospital);
    console.log(hospital); // Debug: Check what is being set
  };

  const handleMapLoad = (map) => {
    console.log("Map loaded:", map);
    // Additional logic to run when the map loads can go here
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <MapComponent selectedHospital={selectedHospital} onMapLoad={handleMapLoad} />
=======
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
>>>>>>> 976382c56f19953a74261410183c5908e7b9b16f
    </div>
  );
};

export default App;
