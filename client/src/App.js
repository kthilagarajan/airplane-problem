import React, { useState } from "react";
import "./App.css";
import Core from "./Core";

function App() {
  var passengers = 30;

  let [passengerCount, setPassengerCount] = useState(passengers);
  let [seatingArrangement, setSeatingArrangement] = useState("[ [3,2], [4,3], [2,3], [3,4] ]");
  let [table, setTable] = useState([]);

  var FILLING = null;

  function renderTable(i, index) {
    // console.log(FILLING[0]);
    let result = [];
    for (var j = 0; j < i[1]; j++) {
      var td = [];
      for (var k = 0; k < i[0]; k++) {
        td.push(
          <td key={k} className={FILLING[index][j][k].class}>
            {FILLING[index][j][k].value}
          </td>
        );
      }
      result.push(<tr key={j}>{td}</tr>);
    }
    return result;
    // return <h1>1</h1>;
  }

  function fillSeats() {
    var parsedSeating = JSON.parse(seatingArrangement);
    FILLING = Core(passengerCount, parsedSeating);
    var _table = []
    parsedSeating.map((i, index) => {
      _table.push(
        <table key={index}>
          <tbody>{renderTable(i, index)}</tbody>
        </table>
      );
    });
    setTable(_table)
  }

  return (
    <div className="App">
      <div>
        <div className="form-inline">
          <label htmlFor="passengers">Total Passengers:</label>
          <input
            type="number"
            id="passengers"
            placeholder="10"
            name="passengers"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
          />
          <label htmlFor="seating">Seating Arrangement:</label>
          <input
            type="text"
            id="seating"
            placeholder="[[1,2], [1,2]]"
            name="seating"
            value={seatingArrangement}
            onChange={(e) => setSeatingArrangement(e.target.value)}
          />
          <button onClick={() => fillSeats()}>Fill Seats</button>
        </div>
      </div>
      {table}
    </div>
  );
}

export default App;
