import QuizQuestion from "components/QuizQuestion";
import QuizLayout from "layouts/QuizLayout";
import { NextPage } from "next";

const Quiz: NextPage = () => {
  return (
    <QuizLayout>
      <QuizQuestion />
    </QuizLayout>
  );
};

export default Quiz;
