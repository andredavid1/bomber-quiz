import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    background-color: green;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    margin: 0 10px;
    cursor: default;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: medium;

    &.active {
      text-decoration: underline;
      font-weight: bold;
    }

    svg {
      display: block;
      margin-top: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  }
`;
