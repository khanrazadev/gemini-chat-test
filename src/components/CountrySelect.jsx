import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { fetchCountries } from "../utils/fetchCountries";
import { ChevronDown } from "lucide-react";

const CountrySelect = ({ value, onChange }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);

      const found = data.find((c) => c.dialCode === value);
      setSelectedCountry(found || null); 
    });
  }, [value]);

  const handleChange = (country) => {
    setSelectedCountry(country);
    onChange(country.dialCode); 
  };

  return (
    <div className="relative w-full">
      <Listbox value={selectedCountry} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full p-2 border rounded bg-white dark:bg-[#222] text-left text-black dark:text-white">
            <span>
              {selectedCountry
                ? `${selectedCountry.name} (${selectedCountry.dialCode})`
                : "Select Country"}
            </span>
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-[#222] text-black dark:text-white rounded shadow z-10">
            {countries.map((country, idx) => (
              <Listbox.Option
                key={idx}
                value={country}
                className={({ active }) =>
                  `cursor-pointer select-none p-2 ${
                    active ? "bg-blue-100 dark:bg-blue-900" : ""
                  }`
                }
              >
                {country.name} ({country.dialCode})
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default CountrySelect;
