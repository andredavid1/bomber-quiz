import { lighten, shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 20px 0;

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    min-height: 400px;

    &.left {
      display: none;
    }

    &.right {
      h3 {
        margin-bottom: 20px;
      }

      div {
        &.row {
          display: flex;
          align-items: center;
          width: 100%;

          span {
            &.title {
              width: 59%;
              text-align: right;
              padding-right: 2px;
            }

            &.value {
              width: 41%;
              text-align: left;
              padding-left: 2px;
            }
          }
        }
      }

      button {
        border: none;
        border-radius: 50px;
        margin: 30px 0;
        padding: 15px 0;
        width: 100px;
        height: 100px;
        text-transform: uppercase;
        font-size: small;
        background-color: ${(props) => props.theme.colors.successBg};
        color: ${(props) => props.theme.colors.white};
        transition: background-color 0.2s;

        &:hover {
          font-weight: bold;
          outline: 1px solid #000;
          background-color: ${(props) =>
            lighten(0.02, props.theme.colors.successBg)};
        }
      }
    }
  }

  @media screen and (min-width: 760px) {
    aside {
      width: 50%;

      &.left {
        display: flex;
      }
    }
  }
`;
