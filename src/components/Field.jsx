import PacDot from "./PacDot";
import Wall from "./Wall";
import { useRef, useState } from "react";
import Pacman from "./Pacman";
import Empty from "./Empty";
import GhostLair from "./GhostLair";

const labyrinth = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1,
  3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 1, 3, 1, 3, 1, 3, 3, 3, 1,
  1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 3, 3, 1, 1, 1, 3, 3, 3, 3, 3,
  3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3,
  3, 3, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1,
  3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 2, 2, 1, 1,
  1, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 1, 1, 3,
  1, 1, 3, 1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 2, 2, 2, 2,
  2, 2, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1,
  1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

let width = 18;

// Labyrinth: 18*18, 40*40px
// Legend:
// 0 - empty
// 1 - wall
// 2 - ghost-lair
// 3 - pac-dot
// console.log(labyrinth.length);
// ------
// array, which stores our game's state
const components_field = [];

// here we add components which correspond to the elements of the game in the array
function createLabyrinth() {
  for (let i = 0; i < labyrinth.length; i++) {
    if (labyrinth[i] === 1) {
      components_field.push(<Wall className="wall" key={crypto.randomUUID()} />);
    } else if (labyrinth[i] === 3) {
      components_field.push(<PacDot className="pac-dot" key={crypto.randomUUID()} />);
    } else if (labyrinth[i] === 0) {
      components_field.push(<Empty key={crypto.randomUUID()} />);
    } else if (labyrinth[i] === 2) {
      components_field.push(<GhostLair className="ghost-lair" key={crypto.randomUUID()} />);
    }
  }
}
createLabyrinth();

// console.log(components_field);

function Field() {
  // starting position of PACMAN, MAX-INDEX: 324
  let [currPacmanIndex, setPacmanIndex] = useState(242);
  let pacmanKey = crypto.randomUUID();
  components_field[currPacmanIndex] = <Pacman key={pacmanKey} />;

  const currKey = useRef("");


  function movePacman() {
    components_field[currPacmanIndex] = <Empty key={crypto.randomUUID()}/>;

    if (currKey.current === "a") {
      console.log(components_field[currPacmanIndex - 1].props.className);
      if (currPacmanIndex % width !== 0 &&
        components_field[currPacmanIndex - 1].props.className !== "wall" &&
        components_field[currPacmanIndex - 1].props.className !== "ghost-lair") {
          console.log(currPacmanIndex, "left");
          setPacmanIndex(currPacmanIndex - 1);
        }
    } else if(currKey.current === "d") {
      console.log(components_field[currPacmanIndex + 1].props.className);
      if (currPacmanIndex % width !== 0 &&
        components_field[currPacmanIndex + 1].props.className !== "wall" &&
        components_field[currPacmanIndex + 1].props.className !== "ghost-lair") {
          console.log(currPacmanIndex, "right");
          setPacmanIndex(currPacmanIndex + 1);
        }
    }
    else {
      console.log("fuck that shit");
    }
  }

  function handleKeyDown(event) {
    // console.log("onKeyDown:", event.key, event.code);
    currKey.current = event.key;
    console.log("Current key:", currKey.current);
    movePacman();
  }

  return (
    <div>
      {" "}
      <input type="button" onKeyDown={handleKeyDown} />
      <div className="grid">
        {components_field.map((element) => {
          return element;
        })}
      </div>
    </div>
  );
}

export default Field;
