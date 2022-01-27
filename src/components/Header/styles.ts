import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.header`
  display: grid;
  justify-content: space-between;
  grid-template-areas:
    "Brand Profile ToggleShowMenu"
    "Menu Menu Menu";
  background: ${(props) => props.theme.colors.primary};
  width: 100%;

  @media screen and (min-width: 760px) {
    grid-template-areas: "Brand Menu Profile";
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
  grid-area: Menu;
  list-style: none;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
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

export const UserProfilerContainer = styled.div`
  grid-area: Profile;
  display: flex;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`;

export const ToggleShowMenu = styled.button`
  grid-area: ToggleShowMenu;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.secondary};
  font-size: x-large;
  padding: 5px 10px;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;
