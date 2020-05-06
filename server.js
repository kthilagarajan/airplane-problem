var passengers = 10;
// var seating = [
//   [3, 2],
//   [2, 2],
//   [4, 3],
// ];
var seating = [
  [3, 2],
  [4, 5],
  [2, 3],
  [3, 4],
];
var AVAILABLE_SEATS = {
  W: seating[0][1] + seating[seating.length - 1][1],
  M: 0,
  C: 0,
};
var ROW_WISE_SEATS = {};
var SEAT_LOCATION = {};
var SUM_OF_POSITIONS = {
  W: 0,
  M: 0,
  C: 0,
};
for (var i = 0; i < seating.length; i++) {
  let columns = seating[i][0];
  let rows = seating[i][1];
  SEAT_LOCATION[i] = {};
  let W_SEAT = 0,
    M_SEAT = 0,
    C_SEAT = 0;
  for (var j = 0; j < columns; j++) {
    if (
      (i === 0 && j == 0) ||
      (i === seating.length - 1 && j == columns - 1)
    ) {
      W_SEAT += 1;
    } else if (j === 0 || j === columns - 1) {
      C_SEAT += 1;
    } else {
      M_SEAT += 1;
    }
  }
  for(var k = 0; k < rows; k++) {
    ROW_WISE_SEATS[k] = ROW_WISE_SEATS[k] || {};
    ROW_WISE_SEATS[k]["W"] = ROW_WISE_SEATS[k]["W"] || 0;
    ROW_WISE_SEATS[k]["W"] += W_SEAT;
    ROW_WISE_SEATS[k]["M"] = ROW_WISE_SEATS[k]["M"] || 0;
    ROW_WISE_SEATS[k]["M"] += M_SEAT;
    ROW_WISE_SEATS[k]["C"] = ROW_WISE_SEATS[k]["C"] || 0;
    ROW_WISE_SEATS[k]["C"] += C_SEAT;
  }
}
console.log(ROW_WISE_SEATS)
let values = Object.values(ROW_WISE_SEATS);
Object.values(ROW_WISE_SEATS).map((o) => {
  SUM_OF_POSITIONS.W += o.W;
  SUM_OF_POSITIONS.M += o.M;
  SUM_OF_POSITIONS.C += o.C;
});
var STARTING_POSITIONS = {
  W: 0,
  M: 0,
  C: 0,
};
STARTING_POSITIONS.C = 1;
STARTING_POSITIONS.W = SUM_OF_POSITIONS.C + 1;
STARTING_POSITIONS.M = SUM_OF_POSITIONS.C + SUM_OF_POSITIONS.W + 1;
var SEAT_FILLING = {};
// var UPDATED_STARTING_POSITION = {
//   ...STARTING_POSITIONS,
// };
console.log(STARTING_POSITIONS)
var STARTING_POSITIONS_MATRIX = {
  0: STARTING_POSITIONS,
};
for (var i = 1; i < Object.keys(ROW_WISE_SEATS).length; i++) {
  // let rows = seating[i][1];
  // let columns = seating[i][0];
  // for (j = 1; j <= 3; j++) {
    // console.log(STARTING_POSITIONS_MATRIX[i - 1].W )
    // console.log(ROW_WISE_SEATS[i-1].W)
    STARTING_POSITIONS_MATRIX[i] = {
      W: STARTING_POSITIONS_MATRIX[i - 1].W + ROW_WISE_SEATS[i-1].W,
      M: STARTING_POSITIONS_MATRIX[i - 1].M + ROW_WISE_SEATS[i-1].M,
      C: STARTING_POSITIONS_MATRIX[i - 1].C + ROW_WISE_SEATS[i-1].C,
    };
  // }
}
console.log(STARTING_POSITIONS_MATRIX)
for (var i = 0; i < seating.length; i++) {
  SEAT_FILLING[i] = SEAT_FILLING[i] || {};
  //   STARTING_POSITIONS = UPDATED_STARTING_POSITION;
  let rows = seating[i][1]; // 2
  let columns = seating[i][0]; // 3
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < columns; y++) {
      SEAT_FILLING[i][x] = SEAT_FILLING[i][x] || {};
      SEAT_FILLING[i][x][y] = 0;
      if ((i == 0 && y == 0) || (i == seating.length - 1 && y == columns - 1)) {
        if(STARTING_POSITIONS_MATRIX[x].W <= passengers) {
            SEAT_FILLING[i][x][y] = STARTING_POSITIONS_MATRIX[x].W;
            STARTING_POSITIONS_MATRIX[x].W += 1;
        }
      } else if (y == 0 || y == columns - 1) {
        if(STARTING_POSITIONS_MATRIX[x].C <= passengers) {
            SEAT_FILLING[i][x][y] = STARTING_POSITIONS_MATRIX[x].C;
            STARTING_POSITIONS_MATRIX[x].C += 1;
        }
      } else {
        if(STARTING_POSITIONS_MATRIX[x].M <= passengers) {
            SEAT_FILLING[i][x][y] = STARTING_POSITIONS_MATRIX[x].M;
            STARTING_POSITIONS_MATRIX[x].M += 1;
        }
      }
    }
  }
}
console.log(AVAILABLE_SEATS)
console.log("ROW_WISE_SEATS");
console.log(ROW_WISE_SEATS);
console.log("SUM_OF_POSITIONS");
console.log(SUM_OF_POSITIONS);
console.log("STARTING_POSITIONS");
console.log(STARTING_POSITIONS);
console.log("STARTING_POSITIONS_MATRIX");
console.log(STARTING_POSITIONS_MATRIX);
console.log("SEAT_FILLING");
console.log(SEAT_FILLING);
