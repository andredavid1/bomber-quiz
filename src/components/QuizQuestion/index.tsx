import Answer from "models/Answer";
import { useEffect, useState } from "react";
import {
  AnswerQuizContainer,
  AnswerRow,
  AnswersContainer,
  Container,
  QuestionContainer,
  QuizActions,
  Statement,
} from "./styles";

const QuizQuestion = () => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (questionSelected: string) => {
    if (selected === questionSelected) {
      setSelected("");
    } else {
      setSelected(questionSelected);
    }
  };

  const previousQuestion = () => {
    setSelected("");
  };

  const nextQuestion = () => {
    setSelected("");
  };

  const finishQuiz = () => {
    setSelected("");
  };

  return (
    <Container>
      <QuestionContainer>
        <Statement>Enunciado</Statement>
        <AnswersContainer>
          <AnswerRow
            className={`${selected === "A" && "selected"}`}
            onClick={() => handleSelect("A")}
          >
            <span className={`option ${selected === "A" && "selected"}`}>
              A
            </span>
            <span className="value">Resposta A</span>
          </AnswerRow>
          <AnswerRow
            className={`${selected === "B" && "selected"}`}
            onClick={() => handleSelect("B")}
          >
            <span className={`option ${selected === "B" && "selected"}`}>
              B
            </span>
            <span className="value">Resposta B</span>
          </AnswerRow>
          <AnswerRow
            className={`${selected === "C" && "selected"}`}
            onClick={() => handleSelect("C")}
          >
            <span className={`option ${selected === "C" && "selected"}`}>
              C
            </span>
            <span className="value">Resposta C</span>
          </AnswerRow>
          <AnswerRow
            className={`${selected === "D" && "selected"}`}
            onClick={() => handleSelect("D")}
          >
            <span className={`option ${selected === "D" && "selected"}`}>
              D
            </span>
            <span className="value">Resposta D</span>
          </AnswerRow>
        </AnswersContainer>
        <QuizActions>
          <button type="button" onClick={() => previousQuestion()}>
            Anterior
          </button>
          <button type="button" onClick={() => finishQuiz()}>
            Finalizar
          </button>
          <button type="button" onClick={() => nextQuestion()}>
            Próxima
          </button>
        </QuizActions>
      </QuestionContainer>
      <AnswerQuizContainer>
        <div className="header">
          <div className="headerNumber">&nbsp;</div>
          <div className="headerOption">A</div>
          <div className="headerOption">B</div>
          <div className="headerOption">C</div>
          <div className="headerOption">D</div>
        </div>
        <div className="row">
          <div className="number">1</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">2</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">3</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">4</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">5</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">6</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">7</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">8</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">9</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">10</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">11</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">12</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">13</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">14</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">15</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">16</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">17</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">18</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">19</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">20</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">21</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">22</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">23</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">24</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">25</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
      </AnswerQuizContainer>
      <AnswerQuizContainer>
        <div className="header">
          <div className="headerNumber">&nbsp;</div>
          <div className="headerOption">A</div>
          <div className="headerOption">B</div>
          <div className="headerOption">C</div>
          <div className="headerOption">D</div>
        </div>
        <div className="row">
          <div className="number">26</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">27</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">28</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">29</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">30</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">31</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">32</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">33</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">34</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">35</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">36</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">37</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">38</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">39</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">40</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">41</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">42</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">43</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">44</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">45</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
        <div className="row">
          <div className="number">46</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">47</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">48</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">49</div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
          <div className="option"></div>
        </div>
        <div className="row">
          <div className="number">50</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
          <div className="option">&nbsp;</div>
        </div>
      </AnswerQuizContainer>
    </Container>
  );
};

export default QuizQuestion;
