import {
  set_game_board_html,
  set_game_board_matrix,
} from "./set_game.js";

const height = 40;
const width = 40;

const player = document.createElement("div");
player.id = "player";

let x = 1;
let y = 0;

let game_board_matrix = set_game_board_matrix(height, width);
const game_board_html = set_game_board_html(game_board_matrix, player);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      if (game_board_matrix[y + 1][x] != "*" && y < height * 3 - 1) {      
        y = y + 1;
        player.parentNode.removeChild(player);
        const next_hall = document.getElementById(x + " " + y);
        console.log(x + " " + y);
        next_hall.appendChild(player);
      }
      break;
    case "ArrowUp":
      if (game_board_matrix[y - 1][x] != "*" && y > 0) {
        y = y - 1;
        player.parentNode.removeChild(player);
        const next_hall = document.getElementById(x + " " + y);
        console.log(x + " " + y);
        next_hall.appendChild(player);
      }
      break;
    case "ArrowLeft":
      if (game_board_matrix[y][x - 1] != "*" && x > 0) {
        x = x - 1;
        player.parentNode.removeChild(player);
        const next_hall = document.getElementById(x + " " + y);
        console.log(x + " " + y);
        next_hall.appendChild(player);
      }
      break;
    case "ArrowRight":
      if (game_board_matrix[y][x + 1] != "*" && x < width * 3 - 1) {
        x = x + 1;
        player.parentNode.removeChild(player);
        const next_hall = document.getElementById(x + " " + y);
        console.log(x + " " + y);
        next_hall.appendChild(player);
      }
      break;
    default:
      return;
  }
});
