const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
    <input
      type="text"
      placeholder="Search..."
      className="w-full p-2 border rounded"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
  export default SearchBar;
  