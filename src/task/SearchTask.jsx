import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
function SearchTask({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  function handleClick(e) {
    e.preventDefault();
    onSearch(searchTerm);
  }
  return (
    <form>
      <div className="flex">
        <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-95 lg:min-w-110">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
            placeholder="Search Task"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            onClick={handleClick}
            type="submit"
            className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
          >
            <IoSearchSharp />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchTask;
