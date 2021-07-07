import React, { useState, useEffect } from "react";

import DataTable from "./components/datatable";

require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {
  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [searchColumns, setSearchColumns] = useState<any[]>([
    "name",
    "hair_color",
  ]);

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  function search(rows: any) {
    return rows.filter((row: any) =>
      searchColumns.some(
        (column: any) =>
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  }

  const columns = data[0] && Object.keys(data[0]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value.toLowerCase())}
        />

        {columns &&
          columns.map((column: any) => (
            <label htmlFor="label">
              <input
                type="checkbox"
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);

                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
            </label>
          ))}
      </div>
      <div>
        <DataTable data={search(data)} />
      </div>
    </div>
  );
}

export default App;
