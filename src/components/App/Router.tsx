import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import RoutePage from "../Routes/RoutePage";
import NewDelivery from "../Delivery/NewDelivery";
import Map from "../Map/Map";
import AddressStartEnd from "./AddressStartEnd";
import EditDelivery from "../Delivery/EditDelivery";
import RouteStartEndAddress from "../Delivery/DefaultAddressEdit";


type RouterComponentProps = {
  children?: ReactElement;
};

const RouterComponent: React.FC<RouterComponentProps> = ({ children }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newroute" element={<RoutePage />} />
      <Route path="/:id" element={<RoutePage />} />
      <Route path="/:id/map" element={<Map />} />
      <Route path="/:id/newdelivery" element={<NewDelivery />} />
      <Route path="/default-address" element={<AddressStartEnd />} />
      <Route path="/:id/edit-delivery" element={<EditDelivery />} />
      <Route path="/:id/edit-address" element={<RouteStartEndAddress />} />
    </Routes>
  );
}

export default RouterComponent;