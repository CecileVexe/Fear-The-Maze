const options = {
  size: 12,
  walls: true,
  hearts: true,
  enemies: true,
  loot: true,
  ice: true,
};

function init() {
  createGrid(options);
  let numberHearts = 3;
  setHearts(numberHearts);

  function whatsInCell(x, y) {
    let cellContent = getCellContent(x, y);
    if (cellContent == HEART && numberHearts <= 5) {
      numberHearts++;
      setHearts(numberHearts);
      return numberHearts;
    } else if (cellContent == MONSTER) {
      if (getMonsterPower(x, y) <= numberHearts) {
        numberHearts = numberHearts - getMonsterPower(x, y);
        setHearts(numberHearts);
        killMonster(x, y);
        return numberHearts;
      } else {
        alert("Vous avez perdu");
      }
    } else if (cellContent == LOOT) {
      loot(x, y);
      console.log();
      if (getTreasures() == 0) {
        alert(
          "Vous avez récupré tous les trésors ! Vous avez gagnez ! Bravo !"
        );
      }
    }
  }

  let way = "";

  document.querySelector("#go-up").onclick = () => {
    way = "up";
    move(way);
  };
  document.querySelector("#go-down").onclick = () => {
    way = "down";
    move(way);
  };
  document.querySelector("#go-right").onclick = () => {
    way = "right";
    move(way);
  };
  document.querySelector("#go-left").onclick = () => {
    way = "left";
    move(way);
  };

  function move() {
    let myHeroPosition = getHeroPosition();
    let x = myHeroPosition.x;
    let y = myHeroPosition.y;
    const walls = getWalls(x, y);
    let north = walls.north;
    let south = walls.south;
    let east = walls.east;
    let west = walls.west;
    let newX = x;
    let newY = y;
    switch (way) {
      case "up":
        if (!north) {
          newX = x;
          newY = y - 1;
          setHeroPosition(newX, newY);
          if (isFrozen(newX, newY)) {
            move();
          }
        }
        break;
      case "down":
        if (!south) {
          newX = x;
          newY = y + 1;
          setHeroPosition(newX, newY);
          if (isFrozen(newX, newY)) {
            move();
          }
        }
        break;
      case "left":
        if (!west) {
          newX = x - 1;
          newY = y;
          setHeroPosition(newX, newY);
          if (isFrozen(newX, newY)) {
            move();
          }
        }
        break;
      case "right":
        if (!east) {
          newX = x + 1;
          newY = y;
          setHeroPosition(newX, newY);
          if (isFrozen(newX, newY)) {
            move();
          }
        }
        break;
      default:
        return null;
    }
    whatsInCell(newX, newY);
  }
}

document.addEventListener("DOMContentLoaded", init);
