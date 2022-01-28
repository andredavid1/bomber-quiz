import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.header`
  display: grid;
  align-items: center;
  grid-template-areas:
    "Brand ToggleShowMenu"
    "Menu Menu"
    "Profile Profile";
  background: ${(props) => props.theme.colors.primary};
  position: relative;
  width: 100%;

  @media screen and (min-width: 760px) {
    grid-template-areas: "Brand Menu";
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

export const Menu = styled.ul.attrs((props: IMenuProps) => {
  show: props.show;
})`
  display: ${(props) => (props.show ? "flex" : "none")};
  position: relative;
  grid-area: Menu;
  list-style: none;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;

  li {
    display: inline-block;
    min-width: 50px;
    transition: background-color 0.4s;

    &:hover {
      background-color: ${(props) => shade(0.1, props.theme.colors.primary)};
    }

    a {
      display: block;
      color: #ffffff;
      padding: 8px 15px;
      text-align: center;
      width: 100%;
    }

    button {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: large;
      padding: 8px;
      width: 100%;
    }
  }

  @media screen and (min-width: 600px) {
    display: flex;
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
