import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const ComboboxAgendamento = ({
  label,
  fetchOptions,
  placeholder,
  setBuscaId,
  initialValue,
  width,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue || "");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const comboboxRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setBuscaId(null);
    handleSearch(value);
    setSearchTerm(value);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option.nome);
    setIsDropdownOpen(false);
    setBuscaId(option.id);
  };

  const handleClickOutside = (event) => {
    if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSearch = useDebouncedCallback((value) => {
    if (!value) {
      setFilteredOptions([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsLoading(true);
    fetchOptions(value)
      .then((data) => {
        setFilteredOptions(data.data);
        setIsDropdownOpen(data.data.length > 0);
      })
      .catch((error) => {
        console.error("Erro ao buscar opções:", error);
        setFilteredOptions([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 500);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (initialValue) {
      setSearchTerm(initialValue);
      setIsDropdownOpen(false);
    }
  }, [initialValue]);

  return (
    <div ref={comboboxRef} className={clsx("relative", width ? `w-${width}`: "w-64" )}>
      <label
        htmlFor="combobox"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id="combobox"
        type="text"
        value={searchTerm}
        placeholder={placeholder || "Digite para buscar"}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(filteredOptions.length > 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && (
        <div className="absolute w-full mt-1 bg-white text-center py-2 border border-gray-300 rounded-lg shadow-md">
          Carregando...
        </div>
      )}
      {!isLoading && isDropdownOpen && (
        <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboboxAgendamento;
