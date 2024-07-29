

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex mb-4">
      <input 
        type="text" 
        placeholder="Search for books or authors..." 
        className="flex-grow p-2 border rounded-l-lg"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button 
        className="p-2 bg-blue-500 text-white rounded-r-lg"
      >
        Search
      </button>
    </div>
  );
};
