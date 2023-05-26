
import { ReactElement} from "react";
import Markers from "./Markers";
import { Coordinates, Delivery} from "../../API";
import React from "react";
import { getRouteById } from "../../helpers/routesHelper";
import { useMap } from "react-map-gl";


type MarkersControllerProps = {
    children?: ReactElement;
    routeId: string|undefined;
  };

const MarkersController: React.FC<MarkersControllerProps> = ({ children ,routeId}) => {
    const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);
    const [start_address, setStart_address] = React.useState<Coordinates>();
    const [end_address, setEnd_address] = React.useState<Coordinates>();
    const map = useMap().current?.getMap();
    const handleGetRouteById = async (id: string) => {
        try {
            const response = await getRouteById(id);
            if (response?.start_address)
            setStart_address(response?.start_address);
            if (response?.end_address)
            setEnd_address(response?.end_address);
            setDeliveries(response?.deliveries.filter((delivery) => delivery !== null) as Delivery[]);
            
        } catch (error) {
            console.log(error);
        }
    }
    const handleLegs = () => {
      try {
        if (start_address && end_address) {
          const allCoordinates = deliveries.map((delivery) => delivery.point);
          allCoordinates.unshift(start_address);
          allCoordinates.push(end_address);
          if(map)
          {
          const lineFeature:any = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: allCoordinates.map((coord) => [
                coord.longitude,
                coord.latitude,
              ]),
            },
            properties: {},
          };
    
          
          map.on("load", () => {
            const source = map.getSource("line-source");
            if(source)
            return;
            else{
            map.addSource("line-source", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [lineFeature],
              },
            });
          }
          if(!map.getLayer("line-layer"))
            map.addLayer({
              id: "line-layer",
              type: "line",
              source: "line-source",
              paint: {
                "line-color": "green",
                "line-width": 3,
              },
            });
          });
      }
        }
      } catch (error) {
        console.log(error);
      }    
    }
    React.useEffect(() => {
        handleLegs();
    },[deliveries]);
    React.useEffect(() => {
        if (routeId) {
            handleGetRouteById(routeId);
        }
    }, []);
    return(
        <>
        {start_address && <Markers
            key={"start"}
            color={"green"}
            longitude={start_address.longitude}
            latitude={start_address.latitude}
            address={start_address.address}
            />}
        {deliveries.map((delivery) => (
            <Markers
            key={delivery.id}
            color={"grey"}
            longitude={delivery.point.longitude}
            latitude={delivery.point.latitude}
            address={delivery.point.address}
            />
        ))};
        {end_address && <Markers
            key={"end"}
            color={"red"}
            longitude={end_address.longitude}
            latitude={end_address.latitude}
            address={end_address.address}
            />}
        </>
      );
}

export default MarkersController;