import useConfig from "hooks/useConfig";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { theme, toggleTheme } = useConfig();

  return (
    <div>
      <button onClick={toggleTheme}>
        {theme.title === "light" ? "Tema Dark" : "Tema Light"}
      </button>
    </div>
  );
};

export default Home;
