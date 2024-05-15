import { useState, useEffect } from "react";
import * as Style from "./style";
import axios from "axios";

function Table() {
  const [topCountries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL);

      const topCountries = response.data.Countries.sort(
        (a, b) => b.TotalConfirmed - a.TotalConfirmed
      ).slice(0, 10);

      setCountries(topCountries);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Top 10 países com maior quantidade de casos ativos de Covid 19</h3>
      <Style.Table>
        <thead>
          <tr>
            <Style.Th>País</Style.Th>
            <Style.Th>Posição</Style.Th>
            <Style.Th>Casos Ativos</Style.Th>
          </tr>
        </thead>

        <tbody>
          {topCountries.map((country, index) => (
            <tr key={country.CountryCode}>
              <Style.Td>{country.Country}</Style.Td>
              <Style.Td>{index + 1}º</Style.Td>
              <Style.Td>{country.TotalConfirmed}</Style.Td>
            </tr>
          ))}
        </tbody>
      </Style.Table>
    </div>
  );
}

export default Table;
