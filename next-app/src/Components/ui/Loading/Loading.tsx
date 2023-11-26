import styles from './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div data-testid="loadingSpinner" className={styles.loadingWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default Loading;
