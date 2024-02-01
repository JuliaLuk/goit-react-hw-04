import "./App.css";
import axios from "axios";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { useLayoutEffect, useState } from "react";

export const App = () => {
  const [articles, setArticles] = useState([]);
  const serchArticles = async (query) => {
    try {
      const response = await axios.get(
        "http://hn.algolia.com/api/v1/search?query=${query}"
      );

      setArticles(response.data.hits);
      // console.log(response.data.hits);
    } catch (error) {}
  };
  return (
    <div>
      <SearchBox onSerch={serchArticles} />
      {articles.length > 0 && (
        <ul>
          {articles.map((article) => (
            <li key={article.objectID}>
              <a href={article.url}>{article.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
