import { useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

const Search = ({ searchValue, setSearchValue }) => {
  const inputRef = useRef();
  const [value, setValue] = useState('');

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 400),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <>
      <div className={styles.root}>
        <svg
          className={styles.icon}
          enableBackground="new 0 0 32 32"
          id="Glyph"
          version="1.1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
            id="XMLID_223_"
          />
        </svg>
        {value && (
          <img onClick={onClickClear} className={styles.btn} src="img/remove.svg" alt="remove" />
        )}
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          onChange={(event) => {
            onChangeInput(event);
          }}
          placeholder="Поиск пиццы"
        />
      </div>
    </>
  );
};

export default Search;
