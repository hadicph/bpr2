
import { Button } from "@aws-amplify/ui-react";
import { ReactElement, useState } from "react";
import {Marker as MapViewMarker, Popup} from "react-map-gl";

type MarkersProps = {
    children?: ReactElement;
    longitude: number;
    latitude: number;
    color?: string;
    address?: string|undefined|null;
  };

  
const Markers: React.FC<MarkersProps> = ({ children,longitude,latitude,color,address}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleMapRedirect = () => {
    try {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
        "_blank"
      );
    }
    catch(error)
    {
      console.log(error);
    }
  };
    return(
        <>
        <MapViewMarker
        longitude={longitude}
        latitude={latitude}
        color={color}
        onClick={togglePopup}
      />

      {showPopup && (
        <Popup
          longitude={longitude}
          latitude={latitude}
          closeButton={false}
          closeOnClick={false}
          anchor="top"
          className="marker-popup"
        >
          <div>{address}</div>
          <Button onClick={handleMapRedirect}>Show On Map</Button>
        </Popup>
      )}
    </>
  );
}

export default Markers;