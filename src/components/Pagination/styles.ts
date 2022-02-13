import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;

  span {
    background-color: ${(props) => props.theme.colors.successBg};
    color: ${(props) => props.theme.colors.white};
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
