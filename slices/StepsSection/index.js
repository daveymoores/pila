import { RichText } from "prismic-reactjs";
import { array, shape } from "prop-types";
import React from "react";

const section = {
  maxWidth: "600px",
  margin: "4em auto",
  textAlign: "center",
};

const h2 = {
  color: "#8592e0",
};

const MySlice = ({ slice }) => null;

MySlice.propTypes = {
  slice: shape({
    primary: shape({
      title: array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MySlice;
