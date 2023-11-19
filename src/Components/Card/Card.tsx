import { Pokemon } from '../../types/Pokemon';
import styles from './Card.module.css';
import { SetURLSearchParams } from 'react-router-dom';

type CardProps = {
  card: Pokemon;
  page: string;
  setSearchParams: SetURLSearchParams;
};

const Card: React.FC<CardProps> = ({ card, page, setSearchParams }) => {
  const { images, name, supertype, id } = card;

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
        <img className={styles.image} src={images.small} alt={name}></img>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{supertype}</p>
      </div>
    </div>
  );
};
export default Card;
