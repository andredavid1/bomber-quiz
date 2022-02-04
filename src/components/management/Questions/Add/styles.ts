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
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 95%;

  label {
    color: #000000;
    font-size: small;
    padding: 0 5px 5px 5px;
    width: 100%;
  }

  input,
  select {
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #333333;
    color: #000000;
    font-size: small;
    outline: none;
    padding: 5px;
    width: 100%;

    &:disabled {
      background-color: #dddddd;
      color: #333333;
    }

    &:focus {
      border-color: #000;
      outline: 1px solid #000;
    }
  }

  &.buttons {
    flex-direction: row;
    justify-content: center;
    margin: 20px 0;

    button {
      border: 1px solid #333333;
      border-radius: 8px;
      padding: 8px 24px;

      &.cancel {
        background: none;
        border: none;
        color: #000000;
        margin-right: 5px;
      }

      &.success {
        background: ${(props) => props.theme.colors.successBg};
        color: ${(props) => props.theme.colors.white};
        margin-left: 4px;
        transition: background-color 0.2s;

        &:hover {
          background-color: ${(props) =>
            shade(0.2, props.theme.colors.successBg)};
        }
      }
    }
  }
`;

export const AnswersContainer = styled.fieldset`
  border: 1px solid #333333;
  border-radius: 5px;
  padding: 10px 5px 5px 5px;
  width: 95%;

  legend {
    color: #000000;
    font-size: small;
    padding: 0 5px;
  }
`;

export const AnswerRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 5px;
  width: 100%;

  label {
    color: #000000;
    margin-right: 5px;
    font-size: small;
  }

  input,
  select {
    background-color: #ffffff;
    border: 1px solid #333333;
    border-radius: 5px;
    color: #000000;
    font-size: small;
    outline: none;
    padding: 5px;

    &:disabled {
      background-color: #dddddd;
      color: #333333;
    }

    &:focus {
      border-color: #000;
      outline: 1px solid #000;
    }
  }

  input {
    flex: 1;
    margin-right: 5px;
  }

  select {
    margin-right: 5px;
    min-width: 80px;
  }
`;
