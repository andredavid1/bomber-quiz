import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  position: relative;

  h2 {
    width: 100%;
    margin-bottom: 25px;
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0;

    label {
      margin-right: 5px;
    }

    input {
      padding: 5px;
    }
  }

  button {
    background-color: green;
    border: none;
    border-radius: 8px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 10px 0;
    padding: 8px;
    transition: background-color 0.4s;
    width: 100%;

    &:hover {
      background-color: ${shade(0.2, "green")};
      color: white;
    }
  }
`;
