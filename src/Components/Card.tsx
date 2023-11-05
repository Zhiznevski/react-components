import styles from './Card.module.css';
import Person from '../types/Person';

type CardProps = {
  character: Person;
};

const Card: React.FC<CardProps> = ({ character }) => {
  const { image, name, gender } = character;
  return (
    <div className={styles.wrapper}>
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
