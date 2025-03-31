import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';

import styles from '../components/NotFoundBlock/NotFoundBlock.module.scss';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState<{ image: string; title: string; price: number }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://67c4cd16c4649b9551b490e4.mockapi.io/items/` + id);
        setPizza(data);
      } catch (error) {
        alert('Отсутствует');
        navigate(`/`);
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return 'Загрузка...';
  }
  return (
    <div className='container'>
      <img src={pizza.image} />
      <p>{pizza.title}</p>
      <span>{pizza.price}₽</span>
      <Link to='/' className={styles.button}>
        <span className={styles.buttonText}>На главную</span>
      </Link>
    </div>
  );
};

export default FullPizza;