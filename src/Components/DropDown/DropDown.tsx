import { Dispatch, SetStateAction } from 'react';
import styles from './DropDown.module.css';

type Props = {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
};

const DropDown: React.FC<Props> = ({ limit, setLimit }) => {
  const limits = [5, 10, 20];
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLimit(+value);
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
