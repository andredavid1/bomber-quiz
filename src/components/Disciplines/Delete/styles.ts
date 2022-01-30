import { shade } from "polished";
import styled from "styled-components";

interface IContainerProps {
  show: boolean;
}

export const Container = styled.div.attrs((props: IContainerProps) => {
  show: props.show;
})`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;

  h3 {
    margin: 30px 0 20px 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.secondary};
  padding-bottom: 20px;
  border-radius: 8px;
  color: #333333;
  max-width: 400px;
  width: 100%;
`;

export const RowForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 90%;

  span {
    font-size: medium;
    text-align: justify;
  }

  button {
    border: 1px solid #333333;
    border-radius: 8px;
    padding: 8px 24px;
    margin-top: 15px;

    &.cancel {
      background: none;
      border: none;
      color: #000000;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${shade(0.2, "#f5f5f5")};
      }
    }

    &.danger {
      background: ${(props) => props.theme.colors.dangerBg};
      color: ${(props) => props.theme.colors.white};
      margin-left: 5px;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${(props) => shade(0.2, props.theme.colors.dangerBg)};
      }
    }
  }
`;
