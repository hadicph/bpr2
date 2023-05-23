import { MapView } from "@aws-amplify/ui-react";
import { ReactElement } from "react";
import { NavigationControl } from "react-map-gl";


type MapProps = {
    children?: ReactElement;
  };

const Map: React.FC<MapProps> = ({ children }) => {
    return(
        <>
        <MapView>
          <NavigationControl position="top-left"/>
        </MapView>
        </>
      );
}

export default Map;