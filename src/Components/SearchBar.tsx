import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../Constants/constants';

type Props = {
  searchTerm: string;
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSubmitValue: Dispatch<SetStateAction<string>>;
  setPageCount: Dispatch<SetStateAction<number | null>>;
};

const SearchBar: React.FC<Props> = ({
  searchTerm,
  inputHandler,
  setSubmitValue,
}) => {
  const navigate = useNavigate();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    navigate(HOME_ROUTE);
    event.preventDefault();
    setSubmitValue(searchTerm);
    localStorage.setItem('searchItem_key', JSON.stringify(searchTerm));
  };

  return (
    <form className="search-form" onSubmit={submitHandler}>
      <input
        className="search-input"
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
