import { Dispatch, SetStateAction } from 'react';
import styles from './DropDown.module.css';
import { SetURLSearchParams } from 'react-router-dom';

type Props = {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setSearchParams: SetURLSearchParams;
};

const DropDown: React.FC<Props> = ({ limit, setLimit, setSearchParams }) => {
  const limits = [5, 10, 20];
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLimit(+value);
    setSearchParams((prev) => ({ ...prev, page: '1' }));
  };
  return (
    <div className={styles.wrapper}>
      <select
        id="select_id"
        className={styles.select}
        value={limit}
        onChange={selectHandler}
      >
        {limits.map((lim, index) => (
          <option key={index} className={styles.option} value={lim}>
            {lim}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropDown;
