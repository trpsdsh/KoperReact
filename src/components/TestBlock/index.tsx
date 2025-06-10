import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchQuizzes, selectQuizzes, Quiz } from '../../redux/slices/quizSlice';
import { addItem, selectCart } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/store';
import styles from './TestBlock.module.scss';

const TestBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const quizzes = useSelector(selectQuizzes);
  const cart = useSelector(selectCart);

  useEffect(() => {
    if (quizzes.length === 0) {
      dispatch(fetchQuizzes());
    }
  }, [dispatch, quizzes.length]);

  const isInCart = (id: string) => cart.items.some((item) => item.id === id);

  const handleAddToCart = (quiz: Quiz) => {
    dispatch(
      addItem({
        id: quiz.id,
        title: quiz.title,
        price: quiz.price,
        image: quiz.image,
        count: 1,
      }),
    );
  };

  return (
    <div className={styles.container}>
      {quizzes.map((quiz, index) => {
        const { id, title, image, bought, price, questions } = quiz;

        const colSpan = index % 3 === 0 ? 2 : 1;
        const accessible = bought || price === 0 || isInCart(id);

        return (
          <div key={id} className={styles.item} style={{ gridColumn: `span ${colSpan}` }}>
            <div className={styles.content}>
              <h3>{title}</h3>
              <img src={image} alt={title} />
              {!bought && price > 0 && <span className={styles.price}>{price} ₽</span>}
            </div>

            <div className={styles.actions}>
              {accessible ? (
                <button onClick={() => navigate(`/test/${id}`)}>Перейти к тесту</button>
              ) : (
                <button className={styles.addToCart} onClick={() => handleAddToCart(quiz)}>
                  Добавить в корзину
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestBlock;
