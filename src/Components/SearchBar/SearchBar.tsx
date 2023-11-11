import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../Constants/constants';
import styles from './SearchBar.module.css';
import { useData } from '../../hooks/useData';

type Props = {
  searchTerm: string;
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPageCount: Dispatch<SetStateAction<number | null>>;
};

const SearchBar: React.FC<Props> = ({ searchTerm, inputHandler }) => {
  const { setSearchValue } = useData();
  const navigate = useNavigate();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    navigate(HOME_ROUTE);
    event.preventDefault();
    setSearchValue(searchTerm);
    localStorage.setItem('searchItem_key', JSON.stringify(searchTerm));
  };

  return (
    <form className={styles.searchForm} onSubmit={submitHandler}>
      <input
        id="form-input"
        className={styles.searchInput}
        type="search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={inputHandler}
      ></input>
      <button type="submit">search</button>
    </form>
  );
};
export default SearchBar;
