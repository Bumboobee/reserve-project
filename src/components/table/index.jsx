import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as Style from "./style";
import axios from "axios";

function Table() {
  const [topCountries, setCountries] = useState([]);
  const [year, setYear] = useState("");
  const quantity = 10;

  const { data, isFetching } = useQuery("data", async () => {
    const response = await axios.get(import.meta.env.VITE_API_URL);
    return response.data;
  });

  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (data) {
      const topCountries = data.Countries.sort(
        (a, b) => b.TotalConfirmed - a.TotalConfirmed
      ).slice(0, quantity);

      setCountries(topCountries);
      setYear(new Date(data.Global.Date).getFullYear());
    } else {
      throw new Error("Failed to fetch data");
    }
  }, [isFetching, data]);

  const formatCurrency = (valor) => {
    return valor.toLocaleString("pt-BR");
  };

  return (
    <>
      <h3>
        Top <span className="font-bold underline">{quantity} países</span> com
        maior quantidade de casos ativos de{" "}
        <span className="text-red-400">
          Covid-19 / <span className="font-bold">{year}</span>
        </span>
      </h3>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden border-2 border-gray-100 rounded-md">
              {isFetching ? (
                <p>Carregando...</p>
              ) : (
                <>
                  <table className="min-w-full text-left text-sm font-light text-surface dark:text-white ">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-center">
                          Posição
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          País
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Casos Ativos
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCountries.map((country, index) => (
                        <tr
                          key={country.CountryCode}
                          className="border-b border-neutral-200 dark:border-white/10"
                        >
                          <Style.Td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                            {index + 1}º
                          </Style.Td>
                          <Style.Td className="whitespace-nowrap px-6 py-4 font-medium">
                            {country.Country}-{country.CountryCode}
                          </Style.Td>
                          <Style.Td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                            {formatCurrency(country.TotalConfirmed)}
                          </Style.Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
