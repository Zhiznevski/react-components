import { HOME_ROUTE } from '../../Constants/constants';
import styles from './SearchBar.module.css';
import { addSearchValue } from '../../store/searchSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const SearchBar: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    // router.push(HOME_ROUTE);
    event.preventDefault();
    if (ref.current) {
    router.push({query: {search: ref.current.value}})
    }
  };
  return (
    <form className={styles.searchForm} onSubmit={submitHandler}>
      <input
        ref={ref}
        data-testid="input"
        id="form-input"
        className={styles.searchInput}
        type="search"
        placeholder="Search by name"
      ></input>
      <button data-testid="submit" type="submit">
        search
      </button>
    </form>
  );
};
export default SearchBar;
