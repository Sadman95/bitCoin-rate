import { traceDeprecation } from "process";
import React, { useEffect, useState } from "react";
import { Currency } from "../types/currency.type";
import Table from "./Table";

const options: Currency[] = [
  { _id: 0, name: "select" },
  { _id: 1, name: "USD" },
  { _id: 2, name: "EUR" },
  { _id: 3, name: "GBR" },
];

let today = new Date();
let priorDate = new Date(new Date().setDate(today.getDate() - 30));

let todayIsoDate = today.toISOString().split("T")[0];
let priorIsoDate = priorDate.toISOString().split("T")[0];

const CurrencyOptions = () => {
  const [currency, setCurrency] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [minMax, setMinMax] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    fetch(
      `https://api.coindesk.com/v1/bpi/currentprice/${
        currency && currency.toLowerCase()
      }.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentRate(data.bpi[currency].rate);
      })
      .catch((error) => {
        if (error) setCurrentRate("not found");
      });
  }, [currency]);

  useEffect(() => {
    fetch(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${priorIsoDate}&end=${todayIsoDate}&currency=${
        currency && currency.toLowerCase()
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const arr: number[] = Object.values(data.bpi);
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        setMinMax({
          min,
          max,
        });
      })
      .catch((error) => {
        if (error) setMinMax({ min: 0, max: 0 });
      });
  }, [currency]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
      <select
        defaultValue={options[0].name}
        onChange={(e) => setCurrency(e.target.value)}
        name="currency"
        id="currency"
      >
        {options.map((opt) => (
          <option key={opt._id} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
      <Table currentRate={currentRate} minMax={minMax} />
    </div>
  );
};

export default CurrencyOptions;
