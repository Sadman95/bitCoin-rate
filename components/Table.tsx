import React from "react";

interface ITable {
  currentRate: string;
  minMax: {
    min: number;
    max: number;
  };
}

const Table = ({ currentRate, minMax }: ITable) => {
  return (
    <>
      <table
        style={{ borderCollapse: "collapse", border: "1px solid lightgray" }}
      >
        <thead>
          <th style={{ border: "1px solid #dddddd" }}>Current Bitcoin Rate</th>
          <th style={{ border: "1px solid #dddddd" }}>
            Lowest Bitcoin Rate in 30 days
          </th>
          <th style={{ border: "1px solid #dddddd" }}>
            Highest Bitcoin Rate in 30 days
          </th>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #dddddd" }}>{currentRate}</td>
            <td style={{ border: "1px solid #dddddd" }}>{minMax.min}</td>
            <td style={{ border: "1px solid #dddddd" }}>{minMax.max}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
