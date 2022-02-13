import { darken, lighten, shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
`;

export const QuestionContainer = styled.div`
  flex: 1;
  max-width: 450px;
  padding: 0 10px;
`;

export const Discipline = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Statement = styled.div`
  text-align: justify;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const AnswersContainer = styled.div`
  margin-bottom: 20px;
`;

export const AnswerRow = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.questionBg};
  border: none;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.textBg};
  margin-bottom: 15px;
  min-height: 60px;
  outline: 1px solid #333333;
  padding: 5px;
  transition: background-color 0.2s;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${(props) => shade(0.05, props.theme.colors.questionBg)};
  }

  &.success {
    outline: ${(props) => `4px solid ${props.theme.colors.successBg}`};
  }

  &.danger {
    outline: ${(props) => `4px solid ${props.theme.colors.dangerBg}`};
  }

  span {
    &.option {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      background: ${(props) => props.theme.colors.infoBg};
      color: ${(props) => props.theme.colors.white};
      margin-right: 10px;

      &.selected {
        background-color: ${(props) => props.theme.colors.warningBg};
        font-weight: bold;
      }

      &.success {
        background-color: ${(props) => props.theme.colors.successBg};
      }

      &.danger {
        background-color: ${(props) => props.theme.colors.dangerBg};
      }
    }

    &.value {
      flex: 1;
      text-align: justify;
    }

    &.correction {
      display: none;
      padding: 0 10px;

      &.finished {
        display: flex;

        svg {
          display: flex;
          font-size: large;

          &.success {
            color: ${(props) => props.theme.colors.successBg};
          }

          &.danger {
            color: ${(props) => props.theme.colors.dangerBg};
          }
        }
      }
    }
  }
`;

export const QuizActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: ${(props) => props.theme.colors.infoBg};
    border: none;
    border-radius: 8px;
    color: ${(props) => props.theme.colors.white};
    padding: 10px 15px;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${(props) => shade(0.2, props.theme.colors.infoBg)};
    }

    &:disabled {
      background: none;
      color: ${(props) => props.theme.colors.text};
      opacity: 0.7;
      cursor: not-allowed;
    }

    &.success {
      background-color: ${(props) => props.theme.colors.successBg};
      color: ${(props) => props.theme.colors.white};

      &:hover {
        background-color: ${(props) =>
          shade(0.2, props.theme.colors.successBg)};
      }
    }
  }
`;

export const AnswerQuizContainer = styled.div`
  display: none;
  padding: 0 10px;

  @media screen and (min-width: 600px) {
    display: flex;
    flex-direction: column;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &.header {
      div.headerNumber {
        width: 17px;
        height: 17px;
      }
      div.headerOption {
        width: 17px;
        height: 17px;
        margin: 0 2px;
      }
    }

    &.row {
      margin: 2px 0;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;

      div.number {
        width: 17px;
        height: 17px;
        border-radius: 50%;

        &.selected {
          font-weight: bold;
          border-radius: 50%;
          background-color: ${(props) => props.theme.colors.infoBg};
          color: ${(props) => props.theme.colors.white};
        }
      }

      div.option {
        width: 17px;
        height: 17px;
        border: 1px solid #333333;
        border-radius: 50%;
        margin: 0 2px;
      }

      &:nth-child(odd) {
        background-color: ${(props) =>
          props.theme.title === "light"
            ? darken(0.08, props.theme.colors.background)
            : lighten(0.06, props.theme.colors.background)};
      }

      &:hover {
        background-color: ${(props) =>
          props.theme.title === "light"
            ? darken(0.1, props.theme.colors.background)
            : lighten(0.08, props.theme.colors.background)};
      }

      div.selected {
        background-color: ${(props) => props.theme.colors.infoBg};
      }

      div.success {
        background-color: ${(props) => props.theme.colors.successBg};
      }

      div.danger {
        background-color: ${(props) =>
          lighten(0.2, props.theme.colors.dangerBg)};
      }
    }
  }
`;
