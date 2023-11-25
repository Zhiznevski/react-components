import Card from '../Card/Card';
import Loading from '../ui/Loading/Loading';
import { Pokemon } from '../../types/Pokemon';

type CardListProps = {
  cards: Pokemon[] | undefined;
  isLoading: boolean;
};

const CardList: React.FC<CardListProps> = ({ cards, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {cards?.length ? (
        cards.map((pokemon) => <Card card={pokemon} key={pokemon.id}></Card>)
      ) : (
        <div>No results match your search criteria</div>
      )}
    </>
  );
};
export default CardList;
