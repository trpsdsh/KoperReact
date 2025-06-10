import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchQuizzes } from '../../redux/slices/quizSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './Quiz.module.scss';
import FullBook from '../FullBook/FullBook';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state: RootState) => state.quiz.items.find((q) => String(q.id) === id));
  const status = useSelector((state: RootState) => state.quiz.status);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showBook, setShowBook] = useState(false);

  useEffect(() => {
    if (status === 'loading' && !quiz) {
      dispatch(fetchQuizzes());
    }
  }, [status, quiz, dispatch]);

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => setShowBook(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  if (status === 'loading' && !quiz) return <div>Загрузка теста...</div>;
  if (status === 'success' && !quiz) return <div>Тест с id "{id}" не найден.</div>;
  if (!quiz) return null;

  const question = quiz.questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (selectedOption === question.correctOptionId) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className={styles.quizPage}>
      <div className={styles.card}>
        <h1>{quiz.title}</h1>

        {!isFinished ? (
          <>
            <p className={styles.question}>{question.question}</p>
            <ul className={styles.options}>
              {question.options.map((opt) => (
                <li
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={selectedOption === opt.id ? styles.selected : ''}>
                  {opt.text}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setSubmitted(true);
                handleSubmit();
              }}
              disabled={selectedOption === null}>
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Завершить тест' : 'Ответить'}
            </button>
          </>
        ) : (
          <>
            <h2>
              ✅ Вы ответили правильно на {correctAnswers} из {quiz.questions.length}
            </h2>
            <button onClick={() => navigate(-1)}>Назад</button>
          </>
        )}

        {showBook && (
          <div className={styles.recommendation}>
            <h3>Рекомендуем к изучению:</h3>
            <FullBook id={'13'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
