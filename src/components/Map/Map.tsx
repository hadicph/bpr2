import { MapView } from "@aws-amplify/ui-react";
import { ReactElement } from "react";
import { NavigationControl } from "react-map-gl";
import MarkersController from "./MarkersController";
import { useParams} from "react-router-dom";

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
    return(
        <>
        <MapView initialViewState={initialViewState}>
          <NavigationControl position="top-left"/>
          <MarkersController routeId={id}/>
        </MapView>
        </>
      );
}

export default Map;