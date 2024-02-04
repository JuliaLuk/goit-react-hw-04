import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { useLayoutEffect, useState } from "react";
import { Articles } from "./components/Articles/Articles";
import { Circles } from "react-loader-spinner";

export const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const serchArticles = async (query) => {
    try {
      setError(false);
      setArticles([]);
      setLoading(true);
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setArticles(response.data.hits);

      console.log(response.data.hits);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <SearchBox onSerch={serchArticles} />
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
      {articles.length > 0 && <Articles items={articles} />}
      <Toaster position="top-center" />
    </div>
  );
};
