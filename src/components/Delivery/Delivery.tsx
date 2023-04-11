import { ReactElement } from "react";

type DeliveryProps = {
    children?: ReactElement;
  };

const Delivery: React.FC<DeliveryProps> = ({ children }) => {
    return(
        <>
        Delivery Page
        </>
      );
}

export default Delivery;