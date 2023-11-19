import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../Constants/constants';
import styles from './SearchBar.module.css';
import { addSearchValue } from '../../store/searchSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';

type Props = {
  searchTerm: string;
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<Props> = ({ searchTerm, inputHandler }) => {
  const navigate = useNavigate();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    navigate(HOME_ROUTE);
    event.preventDefault();
    localStorage.setItem('searchItem_key', JSON.stringify(searchTerm));
    dispatch(addSearchValue(searchTerm));
  };
  const dispatch = useAppDispatch();
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
