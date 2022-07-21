import React from "react";

const Section = ({ children }) => {
  return <div className="section">{children}</div>;
};
export const SectionTitle = ({ children }) => {
  return <div className="section__title">{children}</div>;
};
export const SectionBody = ({ children }) => {
  return <div className="section__body">{children}</div>;
};

export default Section;
