import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Quiz.module.scss';
import FullBook from '../FullBook/FullBook';

const QuizPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showBook, setShowBook] = useState(false);

  const correctAnswer = 2;

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setShowBook(true);
        setTimeout(() => {
          navigate('/KoperReact/13');
        }, 2000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  return (
    <div className={styles.quizPage}>
      <div className={styles.card}>
        <h1>Тест №{id}</h1>

        {!submitted ? (
          <>
            <p className={styles.question}>Какой год основания React?</p>
            <ul className={styles.options}>
              <li
                onClick={() => setSelectedOption(1)}
                className={selectedOption === 1 ? styles.selected : ''}>
                2010
              </li>
              <li
                onClick={() => setSelectedOption(2)}
                className={selectedOption === 2 ? styles.selected : ''}>
                2013
              </li>
              <li
                onClick={() => setSelectedOption(3)}
                className={selectedOption === 3 ? styles.selected : ''}>
                2016
              </li>
            </ul>
            <button onClick={handleSubmit} disabled={selectedOption === null}>
              Завершить тест
            </button>
          </>
        ) : (
          <>
            <h2>
              {selectedOption === correctAnswer ? '🎉 Верно!' : '❌ Неверно, но ничего страшного!'}
            </h2>
            <p>Спасибо за прохождение теста.</p>
            <button onClick={() => navigate(-1)}>Назад</button>
          </>
        )}

        {showBook && (
          <div className={styles.recommendation}>
            <h3>📚 Рекомендуем к изучению:</h3>
            <FullBook />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
