import styles from './Card.module.css';
import Person from '../../types/Person';
import { SetURLSearchParams } from 'react-router-dom';

type CardProps = {
  character: Person;
  page: string;
  setSearchParams: SetURLSearchParams;
};

const Card: React.FC<CardProps> = ({ character, page, setSearchParams }) => {
  const { image, name, gender, id } = character;

  const openDetails = () => {
    setSearchParams((prev) => ({
      ...prev,
      page: page,
      details: id.toString(),
    }));
  };
  return (
    <div
      data-testid="card"
      className={`${styles.wrapper} card`}
      onClick={openDetails}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={name}></img>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{gender}</p>
      </div>
    </div>
  );
};
export default Card;
