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
      components_field.push(<Empty className="empty" key={crypto.randomUUID()} />);
    } else if (labyrinth[i] === 2) {
      components_field.push(<GhostLair className="ghost-lair" key={crypto.randomUUID()} />);
    }
  }
}
createLabyrinth();
// console.log(components_field);

function Field(props) {
  // starting position of PACMAN, MAX-INDEX: 324
  let [currPacmanIndex, setPacmanIndex] = useState(242);
  let pacmanKey = crypto.randomUUID();
  components_field[currPacmanIndex] = <Pacman className="pac-man" key={pacmanKey} />;

  const currKey = useRef("");
  // ------------------------------------------------------- above are states
  // helping functions:
  function restartGame() {
    components_field.length = 0;
    createLabyrinth();
    setPacmanIndex(242);
    props.setScore(0);
  }

  function checkWin() {
    if (parseInt(props.score) === 115) {
      alert("You have won");
      restartGame();
    }
  }

  //----- ----- ----- ----- ----- ----- ----- ----- ----- -----
  function movePacman() {
    components_field[currPacmanIndex] = <Empty className="empty" key={crypto.randomUUID()}/>;

    if (currKey.current === "a") {
      if (currPacmanIndex % width !== 0 &&
        components_field[currPacmanIndex - 1].props.className !== "wall" &&
        components_field[currPacmanIndex - 1].props.className !== "ghost-lair") {
          console.log(currPacmanIndex, "left");
          if (components_field[currPacmanIndex - 1].props.className === "pac-dot") {
            props.setScore(props.score + 1);
          }
          setPacmanIndex(currPacmanIndex - 1);
        }
    } else if(currKey.current === "d") {
      if (currPacmanIndex % width !== 0 &&
        components_field[currPacmanIndex + 1].props.className !== "wall" &&
        components_field[currPacmanIndex + 1].props.className !== "ghost-lair") {
          console.log(currPacmanIndex, "right");
          if (components_field[currPacmanIndex + 1].props.className === "pac-dot") {
            props.setScore(props.score + 1);
          }
          setPacmanIndex(currPacmanIndex + 1);
        }
    } else if (currKey.current === "w") {
      if (currPacmanIndex - width >= 0 &&
        components_field[currPacmanIndex - width].props.className !== "wall" &&
        components_field[currPacmanIndex - width].props.className !== "ghost-lair") {
          console.log(currPacmanIndex, "up");
          if (components_field[currPacmanIndex - width].props.className === "pac-dot") {
            props.setScore(props.score + 1);
          }
          setPacmanIndex(currPacmanIndex - width);
        }
    } else if (currKey.current === "s") {
      if (currPacmanIndex + width < width * width &&
        components_field[currPacmanIndex + width].props.className !== "wall" &&
        components_field[currPacmanIndex + width].props.className !== "ghost-lair") {
          console.log(currPacmanIndex, "down");
          if (components_field[currPacmanIndex + width].props.className === "pac-dot") {
            props.setScore(props.score + 1);
          }
          setPacmanIndex(currPacmanIndex + width);
        }
    }
    else {
      console.log("I did smth wrong");
    }

    checkWin();
  }

  function handleKeyDown(event) {
    // console.log("onKeyDown:", event.key, event.code);
    currKey.current = event.key;
    //console.log("Current key:", currKey.current);
    movePacman();
  }

  return (
    <div>
      {" "}
      <input type="button" onKeyDown={handleKeyDown} value="Start"/>
      <div className="grid">
        {components_field.map((element) => {
          return element;
        })}
      </div>
    </div>
  );
}

export default Field;
