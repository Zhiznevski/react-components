import Card from '../Card/Card';
import { SetURLSearchParams } from 'react-router-dom';
import { useGetPersonsQuery } from '../../services/persons';
import { useAppSelector } from '../../hooks/reduxHooks';

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
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const { data } = useGetPersonsQuery({ name: searchValue, page: page });
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
