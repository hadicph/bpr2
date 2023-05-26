import { MapView } from "@aws-amplify/ui-react";
import { ReactElement } from "react";
import { NavigationControl } from "react-map-gl";
import MarkersController from "./MarkersController";
import { useNavigate, useParams } from "react-router-dom";

type MapProps = {
  children?: ReactElement;
};
const initialViewState = {
  longitude: 9.5018,
  latitude: 56.2639,
  zoom: 7
};

const Map: React.FC<MapProps> = ({ children }) => {
  const { id } = useParams();
  const navigate = useNavigate();



  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page (route page)
  };
  return (
    <>
      <MapView initialViewState={initialViewState}>

        <NavigationControl position="top-left" />
        <MarkersController routeId={id} />
      </MapView>

      <button
        type="button"
        className="btn btn-secondary absolute left-4 bottom-4"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </>
  );
}

export default Map;