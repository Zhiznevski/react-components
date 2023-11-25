import { useRouter } from 'next/router';
import { Pokemon } from '../../types/Pokemon';
import styles from './Card.module.css';
import Image from 'next/image';

type CardProps = {
  card: Pokemon;
};

const Card: React.FC<CardProps> = ({ card }) => {
  const router = useRouter();
  const { images, name, supertype, id } = card;

  const openDetails = () => {
    router.push({ query: { ...router.query, details: id } });
  };
  return (
    <div
      data-testid="card"
      className={`${styles.wrapper} card`}
      onClick={openDetails}
    >
      <div className={styles.imageWrapper}>
        <Image
          priority
          className={styles.image}
          width={220}
          height={300}
          src={images.small}
          alt={name}
        ></Image>
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>{name}</h4>
        <p className={styles.description}>{supertype}</p>
      </div>
    </div>
  );
};
export default Card;
