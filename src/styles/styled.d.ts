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
