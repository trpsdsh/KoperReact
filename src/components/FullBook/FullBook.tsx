import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addItem, CartItem, selectCartItem } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/store';
import styles from './FullBook.module.scss';

interface FullBookProps {
  id?: string | number;
}

const FullBook: React.FC<FullBookProps> = ({ id }) => {
  const params = useParams();
  const finalId = id ?? params.id;
  const navigate = useNavigate();

  const [book, setBook] = React.useState<{
    image: string;
    title: string;
    price: number;
    pages: number;
    description: string;
    rating: number;
  }>();

  const dispatch = useAppDispatch();
  const cartItem = useSelector(selectCartItem(String(finalId)));
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (addedCount > 0 || !book) return;

    const item: CartItem = {
      id: String(finalId),
      title: book.title,
      price: book.price,
      image: book.image,
      count: 1,
    };
    dispatch(addItem(item));
  };

  React.useEffect(() => {
    async function fetchBook() {
      try {
        const { data } = await axios.get(
          `https://67c4cd16c4649b9551b490e4.mockapi.io/koperBooks/${finalId}`,
        );
        setBook(data);
      } catch (error) {
        navigate('/');
      }
    }

    if (finalId) {
      fetchBook();
    }
  }, [finalId, navigate]);

  if (!book) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const renderStars = (count: number) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookInfo}>
        <img className={styles.image} src={book.image} alt={book.title} />
        <div className={styles.rightBlock}>
          <p className={styles.title}>{book.title}</p>
          <p className={styles.rating}>{renderStars(book.rating)}</p>
        </div>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.details}>
        <p className={styles.pages}>Страниц: {book.pages}</p>
        <p className={styles.description}>{book.description}</p>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.buttonsWrapper}>
        <Link to="/" className={styles.button}>
          <span className={styles.buttonText}>На главную</span>
        </Link>

        <div className={styles.priceAddWrapper}>
          <div className={styles.price}>{book.price}₽</div>
          <button
            onClick={onClickAdd}
            className={`${styles.button} ${styles['button--outline']} ${styles['button--add']} ${
              addedCount > 0 ? styles.added : ''
            }`}
            disabled={addedCount > 0}>
            {addedCount > 0 ? (
              // Галочка
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 9.5L1.5 6.5L0.5 7.5L4.5 11.5L12 4L11 3L4.5 9.5Z" fill="white" />
              </svg>
            ) : (
              // Плюс
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
            )}
            <span className={styles.buttonText}>{addedCount > 0 ? 'Добавлено' : 'Добавить'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullBook;
