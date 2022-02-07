import { darken, lighten, shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  font-size: medium;
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Discipline = styled.div`
  margin: 20px;
  text-align: justify;
  width: 400px;
`;

export const Statement = styled.div`
  margin: 25px;
  text-align: justify;
  width: 400px;
  font-weight: bold;
`;

export const AnswersContainer = styled.div`
  padding: 20px 0;
`;

export const AnswerRow = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  width: 400px;
  min-height: 60px;
  border-radius: 8px;

  span {
    display: flex;
    align-items: center;

    &.option {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: ${(props) => props.theme.colors.infoBg};
      color: ${(props) => props.theme.colors.white};
      margin-right: 10px;

      &.selected {
        background-color: ${(props) => props.theme.colors.warningBg};
      }
    }

    &.value {
      flex: 1;
      text-align: justify;
    }
  }

  &.selected {
    border: ${(props) => `5px solid ${props.theme.colors.infoBg}`};
  }
`;

export const QuizActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;

  button {
    background-color: ${(props) => props.theme.colors.infoBg};
    border: none;
    color: ${(props) => props.theme.colors.white};
    padding: 10px 15px;
    border-radius: 8px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.header {
      display: flex;
      flex-direction: row;
      align-items: center;

      div.headerNumber {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      div.headerOption {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
      }
    }

    &.row {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1px;
      font-size: small;
      transition: background-color 0.2s;

      &:nth-child(odd) {
        background-color: ${(props) =>
          props.theme.title === "light"
            ? darken(0.08, props.theme.colors.background)
            : lighten(0.1, props.theme.colors.background)};
      }

      &:hover {
        background-color: ${(props) =>
          props.theme.title === "light"
            ? darken(0.2, props.theme.colors.background)
            : lighten(0.2, props.theme.colors.background)};
      }

      div.number {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.selected {
          font-weight: bold;
          border-radius: 50%;
          background-color: ${(props) => props.theme.colors.infoBg};
          color: ${(props) => props.theme.colors.white};
        }
      }

      div.option {
        border: 1px solid #333333;
        width: 20px;
        height: 20px;
        margin-left: 5px;
      }

      div.selected {
        background-color: ${(props) => props.theme.colors.infoBg};
      }
    }
  }
`;
