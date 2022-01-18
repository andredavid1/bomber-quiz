import LoginLayout from "layouts/LoginLayout";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

const Login: NextPage = () => {
  /* const {login} = useAuth(); */

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    /* await login(email, password); */
  };

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit}>
        <h2>BomberQuiz</h2>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </LoginLayout>
  );
};

export default Login;
