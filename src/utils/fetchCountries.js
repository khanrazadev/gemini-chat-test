export const fetchCountries = async () => {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd');

    if (!res.ok) throw new Error("Failed to fetch countries");

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid country data");

    return data
      .map((c) => ({
        name: c.name.common,
        code: c.cca2,
        dialCode: c.idd?.root
          ? `${c.idd.root}${c.idd.suffixes?.[0] || ''}`
          : '',
      }))
      .filter((c) => c.dialCode);
  } catch (err) {
    console.error("Country fetch error:", err.message);
    return [];
  }
};
