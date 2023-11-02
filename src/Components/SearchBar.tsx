import { Dispatch, SetStateAction } from 'react';

type Props = {
  searchTerm: string;
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSubmitValue: Dispatch<SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({
  searchTerm,
  inputHandler,
  setSubmitValue,
}) => {
  const submitHandler = (event: React.SyntheticEvent) => {
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
