export const SearchBox = ({ onSerch }) => {
  const HandelSubmit = (e) => {
    e.preventDefault();
    onSerch(e.target.elements.query.value);

    e.target.reset();
  };
  return (
    <form onSubmit={HandelSubmit}>
      <input type="text" name="query" />
      <button type="submit">Serch</button>
    </form>
  );
};
