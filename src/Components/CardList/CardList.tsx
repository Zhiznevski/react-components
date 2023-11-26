import Card from '../Card/Card';
import { Pokemon } from '../../types/Pokemon';

type CardListProps = {
  cards: Pokemon[] | undefined;
};

const CardList: React.FC<CardListProps> = ({ cards }) => {
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
