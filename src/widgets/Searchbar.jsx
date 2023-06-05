import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmt = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmt}
      autoComplete="off"
      className="p-2 text-gray-300 bg-gradient-to-tr from-[#f75585] to-[#191624]
  focus-within:text-white "
    >
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-6 h-6 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-300 text-base text-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
