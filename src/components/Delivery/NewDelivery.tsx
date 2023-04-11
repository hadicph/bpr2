import { ReactElement } from "react";

type NewDeliveryProps = {
    children?: ReactElement;
  };

const NewDelivery: React.FC<NewDeliveryProps> = ({ children }) => {
    return(
        <>
        New Delivery Page
        </>
      );
}

export default NewDelivery;