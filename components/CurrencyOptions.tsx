import axios from "axios";
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

  const getCurrentRate = async () => {
    try {
      const response = await axios.get(
        `https://api.coindesk.com/v1/bpi/currentprice/${currency.toLowerCase()}.json`
      );
      setCurrentRate(response.data.bpi[currency].rate);
    } catch (error) {
      setCurrentRate("not found");
    }
  };

  const getPriorRate = async () => {
    try {
      const response = await axios.get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${priorIsoDate}&end=${todayIsoDate}&currency=${currency.toLowerCase()}`
      );
      const arr: number[] = Object.values(response.data.bpi);
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      setMinMax({
        min,
        max,
      });
    } catch (error) {
      if (error) setMinMax({ min: 0, max: 0 });
    }
    return minMax;
  };

  useEffect(() => {
    getCurrentRate();
  }, [currency]);

  useEffect(() => {
    getPriorRate();
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
