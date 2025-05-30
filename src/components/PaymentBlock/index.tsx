import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/slices/cartSlice';
import styles from './PaymentBlock.module.scss';

import mirIcon from '../../assets/img/bank/MirPay.png';
import sberIcon from '../../assets/img/bank/SberPay.png';
import sbpIcon from '../../assets/img/bank/SBP.png';
import gpayIcon from '../../assets/img/bank/GPay.png';
import applepayIcon from '../../assets/img/bank/ApplePay.png';

const PaymentBlock: React.FC = () => {
  const navigate = useNavigate();
  const { totalPrice } = useSelector(selectCart);

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    saveCard: false,
    receipt: false,
  });

  const generateOrderId = (): string => {
    const part = () => Math.floor(1000 + Math.random() * 9000).toString();
    return `${part()}-${part()}-${part()}`;
  };

  const orderId = useMemo(() => generateOrderId(), []);

  const paymentOptions = [
    { name: 'МИР PAY', icon: mirIcon },
    { name: 'С Pay', icon: sberIcon },
    { name: 'через СБП', icon: sbpIcon },
    { name: 'G Pay', icon: gpayIcon },
    { name: 'Apple Pay', icon: applepayIcon },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/not-found');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <strong className={styles.title}>KoperBooks</strong>
        <span className={styles.subtitle}>Обучающий центр</span>
      </div>

      <div className={styles.amount}>
        {totalPrice} <span className={styles.currency}>₽</span>
      </div>
      <div className={styles.order}>Заказ №{orderId}</div>

      <div className={styles.paymentMethods}>
        {paymentOptions.map(({ name, icon }) => (
          <button key={name} className={styles.paymentButton}>
            <img src={icon} alt={name} />
            <span>Оплатить с {name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Привязанные карты</label>
        <select name="cardType" className={styles.input}>
          <option>Новая карта</option>
        </select>

        <label className={styles.label}>Номер карты</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="•••• •••• •••• ••••"
          className={styles.input}
        />

        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Срок действия</label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM / ГГ"
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Проверочный код</label>
            <input
              type="text"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              placeholder="CVC"
              className={styles.input}
            />
          </div>
        </div>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="saveCard"
            checked={formData.saveCard}
            onChange={handleChange}
          />
          Запомнить карту
        </label>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="receipt"
            checked={formData.receipt}
            onChange={handleChange}
          />
          Получить квитанцию
        </label>

        <button type="submit" className={styles.payButton}>
          Оплатить {totalPrice} ₽
        </button>

        <p className={styles.footnote}>
          Нажимая на кнопку Оплатить, вы соглашаетесь с{' '}
          <a href="#" className={styles.link}>
            условиями использования сервиса
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default PaymentBlock;
