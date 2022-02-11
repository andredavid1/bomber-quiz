import { IQuizDTO } from "dtos/IQuizDTO";
import Image from "next/image";
import useAuth from "hooks/useAuth";
import useConfig from "hooks/useConfig";
import useQuiz from "hooks/useQuiz";
import useUser from "hooks/useUser";
import router from "next/router";
import { useEffect, useState } from "react";

import quizImage from "/public/quiz.jpg";
import { Container } from "./styles";

interface IUserPerformance {
  quizAnswered: number;
  average: number;
}

const HomeComponent = () => {
  const { userLogged } = useAuth();
  const { toggleLoading } = useConfig();
  const { createQuiz } = useQuiz();
  const { getPerformance } = useUser();
  const [performance, setPerformance] = useState<IUserPerformance>(
    {} as IUserPerformance
  );

  useEffect(() => {
    async function loadPerformance() {
      const userPerformance: IUserPerformance = await getPerformance(
        userLogged ? userLogged.id : ""
      );
      setPerformance(userPerformance);
    }

    if (userLogged) {
      loadPerformance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = async () => {
    await createQuiz();
  };

  return (
    <Container>
      <aside className="left">
        <Image
          className="imageMain"
          alt="Quiz página inicial"
          src={quizImage}
        />
      </aside>
      <aside className="right">
        <h3>Desempenho</h3>
        {typeof performance.average !== "undefined" ? (
          <>
            <div className="row">
              <span className="title">Desafios Realizados:</span>
              <span className="value">{performance.quizAnswered}</span>
            </div>
            <div className="row">
              <span className="title">Desempenho médio:</span>
              <span className="value">
                {performance.average && performance.average.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <span className="title">Desafios Realizados:</span>
              <span className="value">0</span>
            </div>
            <div className="row">
              <span className="title">Desempenho médio:</span>
              <span className="value">0</span>
            </div>
          </>
        )}

        <button onClick={handleStart}>Iniciar quiz</button>
      </aside>
    </Container>
  );
};

export default HomeComponent;
