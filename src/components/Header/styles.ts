import { lighten, shade } from "polished";
import styled from "styled-components";

export const Container = styled.header`
  display: grid;
  align-items: center;
  grid-template-areas:
    "Brand ToggleShowMenu"
    "Menu Menu";
  background: ${(props) => props.theme.colors.primary};
  position: relative;
  width: 100%;

  @media screen and (min-width: 760px) {
    grid-template-areas: "Brand Menu";
    justify-content: space-between;
  }
`;

export const Brand = styled.h1`
  grid-area: Brand;
  padding: 5px 10px;
  color: #ffffff;
`;

interface IMenuProps {
  show: boolean;
}

export const Menu = styled.nav.attrs((props: IMenuProps) => {
  show: props.show;
})`
  display: ${(props) => (props.show ? "flex" : "none")};
  grid-area: Menu;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (min-width: 600px) {
    display: flex;
  }
`;

export const ListMenu = styled.ul`
  list-style: none;
  float: left;

  li {
    float: left;
    text-align: center;
  }

  li a {
    color: ${(props) => props.theme.colors.white};
    font-size: small;
    text-decoration: none;
    padding: 5px 10px;
    display: block;
  }

  li a:hover {
    background-color: ${(props) =>
      props.theme.title === "light"
        ? shade(0.1, props.theme.colors.primary)
        : lighten(0.03, props.theme.colors.primary)};
  }

  li button {
    color: ${(props) => props.theme.colors.white};
    font-size: small;
    padding: 5px 10px;
    display: block;
    width: 100%;
    border: none;
    background: none;
  }

  li button:hover {
    background-color: ${(props) =>
      props.theme.title === "light"
        ? shade(0.1, props.theme.colors.primary)
        : lighten(0.03, props.theme.colors.primary)};
  }

  li ul {
    position: absolute;
    background: ${(props) => props.theme.colors.primary};

    top: 27px;
    right: 0;
    display: none;

    @media screen and (min-width: 600px) {
      top: 100;
    }
  }

  li:hover ul {
    display: block;
    min-width: 150px;
    width: 100%;
  }

  li ul li {
    display: block;
    width: 100%;
  }
`;

export const UserProfilerContainer = styled.div.attrs((props: IMenuProps) => {
  show: props.show;
})`
  display: ${(props) => (props.show ? "flex" : "none")};
  grid-area: Profile;
  list-style: none;
  width: 100%;
  position: absolute;
  left: 0;
  background-color: lightgray;
  li {
    width: 100%;
  }
`;

export const ToggleShowMenu = styled.button`
  grid-area: ToggleShowMenu;
  background: none;
  border: none;
  position: absolute;
  bottom: 5;
  right: 0;
  color: ${(props) => props.theme.colors.white};
  font-size: x-large;
  padding: 5px 10px;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;
