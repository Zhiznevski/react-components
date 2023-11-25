import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetPersonsQuery } from '@/services/persons';
import SearchBar from '@/Components/SearchBar/SearchBar';
import DropDown from '@/Components/DropDown/DropDown';
import Pagination from '@/Components/Pagination/Pagination';
import CardList from '@/Components/CardList/CardList';
import { useSearchParams } from 'next/navigation';
import DetailedCard from '@/Components/DetailedCard.tsx/DetailedCard';
import { useRouter } from 'next/router';
import Logo from '@/Components/ui/Logo/Logo';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  console.log('asPath', router.asPath);
  const isLoading = useAppSelector(
    (state) => state.cardsLoading.isCardsLoading
  );
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const limit = useAppSelector((state) => state.limit.limit);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details');
  const { data } = useGetPersonsQuery({
    name: searchValue,
    page: +page,
    pageSize: limit,
  });
  const detailsData =  data?.data.find(element => element.id === details);
  const totalPages = data && Math.round(data.totalCount / data.pageSize);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const errorHandler = () => {
    setError(true);
  };

  const closeDetails = () => {
    router.push({query: {page: page}})
  };

  if (error) {
    throw new Error('I crashed!');
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className="app-wrapper">
          <Logo/>
          <div className="control-block">
            <SearchBar inputHandler={inputHandler} searchTerm={searchTerm} />
            <button onClick={errorHandler}>throw an error</button>
            <DropDown />
          </div>
          <Pagination page={page} details={details} pageCount={totalPages} />
          <div className="main-block">
            <div className="cards__wrapper">
              {details && <div className="hidden" onClick={closeDetails}></div>}
              <CardList cards={data?.data} isLoading={isLoading}/>
            </div>
            {details && <DetailedCard page={page} detailsData={detailsData} />}
          </div>
        </div>
      </main>
    </>
  );
}
