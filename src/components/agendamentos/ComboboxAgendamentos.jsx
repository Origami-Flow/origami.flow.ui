import { request } from "../../axios/request";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const ComboboxAgendamentos = () => {
  const options = [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const comboboxRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    handleSearch(value);
    setSearchTerm(value);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    setIsDropdownOpen(filtered.length > 0);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
    setIsLoading(true); 
    request
      .getClienteNome(value)
      .then((response) => {
        const data = response.data;
        const options = data?.map((cliente) => ({id: cliente.id, nome: cliente.nome}));
        setFilteredOptions(options);
        setIsDropdownOpen(options.length > 0); 
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
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

  return (
    <div ref={comboboxRef} className="relative w-64">
      <label
        htmlFor="combobox"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Nome do cliente:
      </label>
      <input
        id="combobox"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(filteredOptions.length > 0)}
        className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite o nome"
      />
      {isLoading && (
        <div className="absolute w-full mt-1 bg-white text-center py-2 border border-gray-400 rounded-lg shadow-md">
          Carregando...
        </div>
      )}
      {!isLoading && isDropdownOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-400 rounded-lg shadow-md max-h-40 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option?.id}
              onClick={() => handleOptionClick(option?.nome)}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option?.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboboxAgendamentos;
