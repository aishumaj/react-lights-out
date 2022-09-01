import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 7, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {

    const initialBoard = Array.from({ length: nrows })
      .map(row => Array.from({ length: ncols })
        .map(cell => Math.random() < chanceLightStartsOn));

    return initialBoard;
  }


  /** checks to see if entire board is composed of falsey cells */
  function hasWon() {
    // for(let row of board){
    //   if(row.includes(true)){
    //     return false;
    //   }
    // }    
    // return true;

    return board.every(r => r.every(c => !c));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(r => [...r]);
      //question: Does this need to be a deep copy to the level of inner arrays

      // n the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) return <div>You won!</div>;

  // make table board
  let tbl = [];

  for (let y = 0; y < nrows; y++) {
    const row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell 
          key={coord} 
          isLit={board[y][x]} 
          flipCellsAroundMe={evt => flipCellsAround(coord)}
        />
      );
    }
    tbl.push(<tr key={y}>{row}</tr>);
  }


  return (
    <table>
      <tbody>{tbl}</tbody>
    </table>
  );

}

export default Board;
