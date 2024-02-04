import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { useEffect, useLayoutEffect, useState } from "react";
import { Articles } from "./components/Articles/Articles";
import { Circles } from "react-loader-spinner";

export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const serchArticles = async (newQuery) => {
    setQuery(`${Date.now()}/${newQuery}`);
    setPage(1);
    setArticles([]);
  };

  const handelLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `http://hn.algolia.com/api/v1/search`,
          {
            params: {
              query: query.split("/")[1],
              page,
              hitsPerPage: 10,
            },
          }
        );
        setArticles((prevArticles) => [...prevArticles, ...response.data.hits]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, page]);
  return (
    <div>
      <SearchBox onSerch={serchArticles} />

      {articles.length > 0 && <Articles items={articles} />}
      {articles.length > 0 && !loading && (
        <button onClick={handelLoadMore}>Load more</button>
      )}
      {loading && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {error && <b>Ooops, somethitg is wrong, please reload peage </b>}

      <Toaster position="top-center" />
    </div>
  );
};
