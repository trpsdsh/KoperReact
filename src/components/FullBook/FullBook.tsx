import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { addItem, CartItem, selectCartItem } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/store';
import styles from './FullBook.module.scss';

const FullBook = () => {
  const [book, setBook] = React.useState<{
    image: string;
    title: string;
    price: number;
    pages: number;
    description: string;
    rating: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cartItem = useSelector(selectCartItem(id!));
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (addedCount > 0) return;

    const item: CartItem = {
      id: id!,
      title: book?.title!,
      price: book?.price!,
      image: book?.image!,
      count: 1,
    };
    dispatch(addItem(item));
  };

  React.useEffect(() => {
    async function fetchBook() {
      try {
        const { data } = await axios.get(
          `https://67c4cd16c4649b9551b490e4.mockapi.io/koperBooks/${id}}`,
        );
        console.log(data);

        setBook(data);
      } catch (error) {
        navigate('/');
      }
    }

    fetchBook();
  }, [id]);

  if (!book) {
    return 'Загрузка...';
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
          <button onClick={onClickAdd} className={styles.button} disabled={addedCount > 0}>
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
            <span className={styles.buttonText}>Добавить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullBook;
