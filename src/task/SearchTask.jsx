function SearchTask({ value, onChange }) {
  return (
    <div className="flex">
      <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-95 lg:min-w-110">
        <input
          type="search"
          id="search-dropdown"
          className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
          placeholder="Search Task"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default SearchTask;
