import QuizQuestion from "components/QuizQuestion";
import useQuiz from "hooks/useQuiz";
import QuizLayout from "layouts/QuizLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Quiz: NextPage = () => {
  const router = useRouter();
  const { handleSelectQuiz } = useQuiz();

  const { id } = router.query;

  useEffect(() => {
    id && handleSelectQuiz(id.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizLayout>
      <QuizQuestion />
    </QuizLayout>
  );
};

export default Quiz;
