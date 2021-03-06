import { darken, lighten, shade } from "polished";
import styled from "styled-components";

interface IContainerProps {
  show: boolean;
}

export const Container = styled.div.attrs((props: IContainerProps) => {
  show: props.show;
})`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;

  table {
    width: 96%;
    border-collapse: collapse;
    border-radius: 8px;
    font-size: small;
  }

  tbody tr {
    &:nth-child(odd) {
      background: ${(props) =>
        props.theme.title === "light"
          ? "#eef"
          : lighten(0.06, props.theme.colors.infoBg)};
    }

    &:nth-child(even) {
      background: ${(props) =>
        props.theme.title === "light"
          ? "#ddf"
          : lighten(0.04, props.theme.colors.infoBg)};
    }

    &:hover {
      background-color: ${(props) =>
        props.theme.title === "light"
          ? "#ccf"
          : lighten(0.08, props.theme.colors.infoBg)};
    }
  }

  th,
  td {
    padding: 7px 5px;
  }

  th {
    background-color: ${(props) => props.theme.colors.infoBg};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;

    &:first-child {
      border-top-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
    }

    &.optional {
      @media screen and (max-width: 760px) {
        display: none;
      }
    }

    button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      outline: none;
      color: ${(props) => props.theme.colors.white};
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
      padding: 0 6px;
    }
  }

  td {
    button {
      background: none;
      border: none;
      outline: none;
      color: ${(props) => props.theme.colors.text};
    }

    button + button {
      margin-left: 5px;
    }

    &.optional {
      @media screen and (max-width: 760px) {
        display: none;
      }
    }

    &.bigger {
      width: 100%;
    }

    &.actions {
      text-align: center;
      min-width: 80px;
    }

    &.center {
      text-align: center;
    }
  }

  tfoot tr td {
    background-color: ${(props) => props.theme.colors.infoBg};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
