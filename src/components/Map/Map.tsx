import { ReactElement } from "react";

type MapProps = {
    children?: ReactElement;
  };

const Map: React.FC<MapProps> = ({ children }) => {
    return(
        <>
       Map Page
        </>
      );
}

export default Map;