import { StateInputs } from '../../store/formSlice';
import styles from './Card.module.css';

type CardProps = {
  card: StateInputs;
  isLast: boolean;
};

const Card: React.FC<CardProps> = ({ card, isLast }) => {
  const { name, age, email, password, confirmPassword, image } = card;
  console.log(image);
  return (
    <div
      style={{ border: isLast ? '2px solid #646cff' : 'none' }}
      className={`${styles.wrapper} card `}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={name}></img>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Name</div>
            <div className={styles.itemDescription}>{name}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Age</div>
            <div className={styles.itemDescription}>{age}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Email</div>
            <div className={styles.itemDescription}>{email}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>password</div>
            <div className={styles.itemDescription}>{password}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>confirmPassword</div>
            <div className={styles.itemDescription}>{confirmPassword}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Card;
