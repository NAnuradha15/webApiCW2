import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

const markers = [
  {
    id: 1,
    name: "Colombo",
    position: { lat: 6.922002, lng: 79.773803 },
  },
];
function App() {
  const [activeMarker, setActiveMarker] = useState();
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBoVslhdnBJ2UmvVy0vXqLbAMQm6mWPaZk",
  });
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      {isLoaded ? (
        <GoogleMap
          center={{
            lat: 7.8548845,
            lng: 78.0635329,
          }}
          zoom={8}
          mapContainerStyle={{
            width: "100%",
            height: "90vh",
          }}
        >
          {markers.map(({ id, name, position }) => {
            <MarkerF key={id} position={position}>
              
            </MarkerF>;
          })}
        </GoogleMap>
      ) : null}
    </div>
  );
}

export default App;
