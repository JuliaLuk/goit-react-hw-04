import toast from "react-hot-toast";
export const SearchBox = ({ onSerch }) => {
  const HandelSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.query.value.trim() === "") {
      toast.error("empty srting");

      return;
    }
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
