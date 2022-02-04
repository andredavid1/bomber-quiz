import router from "next/router";
import { Container } from "./styles";

const HomeComponent = () => {
  const handleStart = () => {
    router.push("/quiz");
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
          <span className="value">3</span>
        </div>
        <div className="row">
          <span className="title">Desempenho médio:</span>
          <span className="value">72</span>
        </div>
        <button onClick={handleStart}>Iniciar quiz</button>
      </aside>
    </Container>
  );
};

export default HomeComponent;
