import Image from 'next/image';
import img from '../../../assets/pokemon.svg';

const Logo: React.FC = () => {
  return (
    <div data-testid="logo" className="main-logo">
      <Image
        placeholder="blur"
        blurDataURL={'../assets/pokemon.svg'}
        className="logo"
        src={img}
        alt="logo"
        width={200}
        height={100}
      />
    </div>
  );
};
export default Logo;
