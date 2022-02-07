import useAuth from "hooks/useAuth";
import useQuiz from "hooks/useQuiz";
import useUser from "hooks/useUser";
import router from "next/router";
import { useEffect, useState } from "react";
import { Container } from "./styles";

interface IUserPerformance {
  quizAnswered: number;
  average: number;
}

const HomeComponent = () => {
  const { userLogged } = useAuth();
  const { createQuiz } = useQuiz();
  const { getPerformance } = useUser();
  const [performance, setPerformance] = useState<IUserPerformance>(
    {} as IUserPerformance
  );

  useEffect(() => {
    async function loadPerformance() {
      const userPerformance = await getPerformance(
        userLogged ? userLogged.id : ""
      );
      setPerformance(userPerformance);
    }

    if (userLogged) {
      loadPerformance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    createQuiz();
  };

  return (
    <Container>
      <aside className="left">
        <span>colocar imagem lado esquerdo quando tamanho {">"} 760</span>
      </aside>
      <aside className="right">
        <h3>Desempenho</h3>
        <div className="row">
          <span className="title">Desafios Realizados:</span>
          <span className="value">{performance.quizAnswered}</span>
        </div>
        <div className="row">
          <span className="title">Desempenho médio:</span>
          <span className="value">{performance.average}</span>
        </div>
        <button onClick={handleStart}>Iniciar quiz</button>
      </aside>
    </Container>
  );
};

export default HomeComponent;
