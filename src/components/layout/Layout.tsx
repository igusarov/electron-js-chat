import styled from "styled-components";
import React from "react";
import { gridStep, primaryColor } from "../../css-variables";

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  height: ${gridStep * 10}px;
  background-color: ${primaryColor};
  box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
`;

export const Content = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  background: white;
  height: 100%;
  padding: ${gridStep * 10}px 0 ${gridStep * 20}px 0;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  height: ${gridStep * 20}px;
  background: ${primaryColor};
  width: 100%;
  box-shadow: 0px -3px 5px -2px rgba(0, 0, 0, 0.75);
`;
