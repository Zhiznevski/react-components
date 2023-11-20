import Card from '../Card/Card';
import { SetURLSearchParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Pokemon } from '../../types/Pokemon';

type CardListProps = {
  cards: Pokemon[] | undefined;
  isLoading: boolean;
  page: string;
  setSearchParams: SetURLSearchParams;
};

const CardList: React.FC<CardListProps> = ({
  cards,
  isLoading,
  page,
  setSearchParams,
}) => {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {cards?.length ? (
        cards.map((pokemon) => (
          <Card
            card={pokemon}
            page={page}
            setSearchParams={setSearchParams}
            key={pokemon.id}
          ></Card>
        ))
      ) : (
        <div>No results match your search criteria</div>
      )}
    </>
  );
};
export default CardList;
