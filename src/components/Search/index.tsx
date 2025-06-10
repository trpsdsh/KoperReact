import React from 'react';
import debounce from 'lodash.debounce';

import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((input) => {
      dispatch(setSearchValue(input));
    }, 350),
    [],
  );

  return (
    <div className={styles.root}>
      <svg
        className={styles.iconSearch}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 30 30">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск книг..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.iconClear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32">
          <g data-name="23-Remove">
            <path d="M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z" />
            <path d="M23.29 7.29 16 14.59l-7.29-7.3-1.42 1.42 7.3 7.29-7.3 7.29 1.42 1.42 7.29-7.3 7.29 7.3 1.42-1.42-7.3-7.29 7.3-7.29-1.42-1.42z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
