import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;
      white: string;

      infoBg: string;
      warningBg: string;
      successBg: string;
      dangerBg: string;

      questionBg: string;
      textBg: string;

      background: string;
      text: string;
    };
  }
}
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;

      background: string;
      text: string;
    };
  }
}
