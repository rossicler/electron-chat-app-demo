import React from "react";
import Navbar from "../components/Navbar";

const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

export const withBaseLayout = (Component, config) => (props) => {
  const viewName = getDisplayName(Component);
  return (
    <>
      <Navbar {...config} view={viewName} />
      <Component {...props} />
    </>
  );
};
