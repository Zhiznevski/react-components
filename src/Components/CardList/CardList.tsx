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
  const { persons } = useData();

  return (
    <>
      {persons?.length ? (
        persons?.slice(0, limit).map((person) => (
          <div
            style={{ transition: '.3s' }}
            key={person.id}
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                page: page,
                details: person.id.toString(),
              }))
            }
          >
            <Card character={person} key={person.id}></Card>
          </div>
        ))
      ) : (
        <div>No results match your search criteria</div>
      )}
    </>
  );
};
export default CardList;
