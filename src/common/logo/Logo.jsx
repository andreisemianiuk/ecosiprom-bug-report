import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

const LogoItem = styled.div`
  width: ${({ width }) => `${width}px`};
`;

export const Logo = ({ color, width }) => {
  return (
    <LogoItem width={width}>
      {color === "primary" ? (
        <StaticImage
          src={"../../images/logo-ecosiprom.png"}
          alt="Logo for site"
          placeholder="tracedSVG"
          layout="constrained"
        />
      ) : (
        <StaticImage
          src="../../images/logo-ecosiprom-white.png"
          alt="Logo for site"
          placeholder="tracedSVG"
          layout="constrained"
        />
      )}
    </LogoItem>
  );
};
