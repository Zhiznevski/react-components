import { AppContextType } from '../../Context/AppContext';
import { useData } from '../../hooks/useData';
import Card from '../Card/Card';

import { SetURLSearchParams } from 'react-router-dom';

type CardListProps = {
  limit: number;
  page: string;
  setSearchParams: SetURLSearchParams;
};

const CardList: React.FC<CardListProps> = ({
  limit,
  page,
  setSearchParams,
}) => {
  const { persons } = useData() as AppContextType;

  return (
    <>
      {persons?.length ? (
        persons
          ?.slice(0, limit)
          .map((person) => (
            <Card
              character={person}
              page={page}
              setSearchParams={setSearchParams}
              key={person.id}
            ></Card>
          ))
      ) : (
        <div>No results match your search criteria</div>
      )}
    </>
  );
};
export default CardList;
