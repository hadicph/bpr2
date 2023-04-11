import { ReactElement } from "react";

type RouteProps = {
    children?: ReactElement;
  };

const RoutePage: React.FC<RouteProps> = ({ children }) => {
    return(
        <>
        New Route Page
        </>
      );
}

export default RoutePage;