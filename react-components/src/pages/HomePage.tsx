import { CardList } from '../components/CardList';
import React, { useState /* useEffect */ } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { CardDetails } from '../components/CardDetails';
/* import { Error } from '../components/Error';
import { Loader } from '../components/Loader'; */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  useGetPersonsByNameQuery /* useGetPersonsStartQuery */,
} from '../redux/services/rick_morti';
import { changePersons } from '../redux/features/personsSlice';

export function HomePage() {
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.search.inputValue);
  const persons = useSelector((state: RootState) => state.persons.persons);

  const {
    data: dataSearch,
    /* error: errorSearch,
    isFetching: isFetchingSearch, */
  } = useGetPersonsByNameQuery(inputValue);

  if (dataSearch) {
    dispatch(changePersons(dataSearch.results));
  }

  return (
    <div data-testid="container" className="container">
      <div className="container_header-main">
        <Header />
        {isShow && (
          <div
            data-testid="cardDetails-shadow"
            className="cardDetails-shadow"
            onClick={() => {
              setIsShow(false);
            }}
          ></div>
        )}
        {isShow && (
          <CardDetails
            onClose={() => {
              setIsShow(false);
            }}
          />
        )}
        <main className="main">
          <div className="container_home">
            <h2 data-testid="homepage-h1">Library Rick and Morty</h2>
            <SearchBar />
            <CardList persons={persons} onShowDetails={() => setIsShow(true)} />
            {/* {isFetchingSearch ? (
              <Loader />
            ) : errorSearch ? (
              <Error onMini={false} />
            ) : (
              <CardList persons={persons} onShowDetails={() => setIsShow(true)} />
            )} */}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
