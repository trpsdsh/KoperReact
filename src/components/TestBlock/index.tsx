import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TestBlock.module.scss';

const quizzes = [
  { id: 1, name: 'Тест на знание', colSpan: 2, bought: true, price: 0 },
  { id: 2, name: 'Тест на незнание', colSpan: 1, bought: false, price: 299 },
  { id: 3, name: 'Тест на незнание', colSpan: 1, bought: false, price: 199 },
  { id: 4, name: 'Тест на незнание', colSpan: 1, bought: true, price: 0 },
];

const TestBlock: React.FC = () => {
  const navigate = useNavigate();

  const handleAddToCart = (quizId: number) => {
    alert(`Тест добавлен в корзину`);
  };

  return (
    <div className={styles.container}>
      {quizzes.map(({ id, name, colSpan, bought, price }) => {
        const quizClass = styles[`quiz`] || '';
        return (
          <div
            key={id}
            className={`${styles.item} ${quizClass}`}
            style={{ gridColumn: `span ${colSpan}` }}>
            <div className={styles.content}>
              <h3>{name}</h3>
              {!bought && <span className={styles.price}>{price} ₽</span>}
            </div>
            <div className={styles.actions}>
              {bought ? (
                <button onClick={() => navigate(`/tests`)}>Перейти к тесту</button>
              ) : (
                <button onClick={() => handleAddToCart(id)}>Добавить в корзину</button>
              )}
            </div>
            <div className={styles.picture} />
          </div>
        );
      })}
    </div>
  );
};

export default TestBlock;
