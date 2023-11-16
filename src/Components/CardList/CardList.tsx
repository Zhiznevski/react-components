import { AppContextType } from '../../Context/AppContext';
import { useData } from '../../hooks/useData';
import Card from '../Card/Card';

import { SetURLSearchParams } from 'react-router-dom';
import { useGetPersonsQuery } from '../../services/persons';

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
  const { searchValue } = useData() as AppContextType;
  const { data } = useGetPersonsQuery({ name: searchValue, page: page });
  console.log(data);
  return (
    <>
      {data?.results?.length ? (
        data.results
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
