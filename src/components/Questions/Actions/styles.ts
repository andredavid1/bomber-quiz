import styled from "styled-components";

interface IContainerProps {
  show: boolean;
}

export const Container = styled.div.attrs((props: IContainerProps) => {
  show: props.show;
})`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 96%;

  > button {
    background-color: ${(props) => props.theme.colors.infoBg};
    color: ${(props) => props.theme.colors.white};
    border-radius: 6px;
    border: none;
    padding: 8px 16px;
  }
`;

interface ISearchContainerProps {
  showButton: boolean;
}

export const SearchContainer = styled.div.attrs(
  (props: ISearchContainerProps) => {
    showButton: props.showButton;
  }
)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333333;
  border-radius: 8px;
  background-color: #fff;
  height: 30px;
  width: 250px;

  input,
  button {
    border: none;
    background: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  input {
    flex: 1;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 7px;
  }

  button {
    display: flex;
    visibility: ${(props) => (props.showButton ? "visible" : "hidden")};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    color: red;
    font-size: x-large;
    padding-right: 6px;
  }
`;
