import React from 'react';
import { useSelector } from 'react-redux';
import { addItem, CartItem, selectCartItem } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';

type BookBlockType = {
  id: string;
  title: string;
  price: number;
  image: string;
};

const BookBlock: React.FC<BookBlockType> = ({ id, title, price, image }) => {
  const cartItem = useSelector(selectCartItem(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const dispatch = useAppDispatch();

  const onClickAdd = () => {
    if (addedCount > 0) return;

    const item: CartItem = {
      id,
      title,
      price,
      image,
      count: 1,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="book-block">
      <Link to={`book/${id}`}>
        <div className="book-block__wrapper">
          <img className="book-block__image" src={image} alt="Book" />
          <h4 className="book-block__title">{title}</h4>
        </div>
      </Link>
      <div className="book-block__bottom">
        <div className="book-block__price"> {price} ₽</div>
        <button
          onClick={onClickAdd}
          className={`button button--outline button--add ${addedCount > 0 ? 'added' : ''}`}
          disabled={addedCount > 0}>
          {addedCount > 0 ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 9.5L1.5 6.5L0.5 7.5L4.5 11.5L12 4L11 3L4.5 9.5Z" fill="white" />
            </svg>
          ) : (
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
          <span>{addedCount > 0 ? 'Добавлено' : 'Добавить'}</span>
        </button>
      </div>
    </div>
  );
};

export default BookBlock;
