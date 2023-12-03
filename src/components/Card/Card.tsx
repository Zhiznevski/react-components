import { FormInputs } from '../../types/types';
import styles from './Card.module.css';
type CardProps = {
    card: FormInputs
}
  
  const Card: React.FC<CardProps> = ({ card  }) => {
 const {name, age, email, password, confirmPassword} = card
    return (
      <div
        className={`${styles.wrapper} card`}

      >
        <div className={styles.imageWrapper}>
          {/* <img className={styles.image} src={images.small} alt={name}></img> */}
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{name}</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.itemTitle}>Name</div>
              <div className={styles.itemDescription}>
                {name}
              </div>
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