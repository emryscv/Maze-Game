import { TILES } from "./tiles.js";

function transalte_tiles(height, width, game_board_matrix) {
  const game_board = [];

  for (let i = 0; i < height; i++) {
    game_board[i * 3] = [];
    game_board[i * 3 + 1] = [];
    game_board[i * 3 + 2] = [];

    for (let j = 0; j < width; j++) {
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          game_board[i * 3 + k][j * 3 + l] =
            TILES[game_board_matrix[i][j]][k][l];
        }
      }
    }
  }

  return game_board;
}

export function build_tiles_graph(tiles) {
  const right_graph = [];
  const down_graph = [];

  tiles.forEach((current_tile, i) => {
    right_graph[i] = [];
    down_graph[i] = [];
    tiles.forEach((append_tile, j) => {
      if (
        current_tile[2][0] == append_tile[0][0] &&
        current_tile[2][1] == append_tile[0][1] &&
        current_tile[2][2] == append_tile[0][2]
      ) {
        down_graph[i].push(j);
      }

      if (
        current_tile[0][2] == append_tile[0][0] &&
        current_tile[1][2] == append_tile[1][0] &&
        current_tile[2][2] == append_tile[2][0]
      ) {
        right_graph[i].push(j);
      }
    });
  });

  return { right_graph, down_graph };
}

export function set_game_board_html(game_board_matrix, player) {
  const game_board_html = document.getElementById("game_board");

  game_board_matrix.forEach((row, y_i) => {
    const row_div = document.createElement("div");
    game_board_html?.appendChild(row_div);
    row_div.className = "row";
    row.forEach((cell, x_i) => {
      const cell_div = document.createElement("div");
      cell_div.className = cell == "*" ? "wall" : "hall";
      row_div.appendChild(cell_div);
      cell_div.id = x_i + " " + y_i;
      if (cell == "p") {
        cell_div.appendChild(player);
      }
    });
  });

  return game_board_html;
}

export function set_game_board_matrix(height, width) {
  const { right_graph, down_graph } = build_tiles_graph(TILES);
  let game_board_matrix = [];

  for (let i = 0; i < height; i++) {
    game_board_matrix[i] = [];
    for (let j = 0; j < width; j++) {
      let options = new Set([]);
      if (i > 0) {
        options = options.union(
          new Set(down_graph[game_board_matrix[i - 1][j]])
        );
      }
      if (j > 0) {
        if (options.size > 0) {
          options = options.intersection(
            new Set(right_graph[game_board_matrix[i][j - 1]])
          );
        } else {
          options = options.union(
            new Set(right_graph[game_board_matrix[i][j - 1]])
          );
        }
      }
      if (options.size == 0) {
        options = options.union(new Set([0, 1, 2, 4, 6, 7, 8, 9, 10]));
      }

      options = Array.from(options);
      game_board_matrix[i][j] =
        options[Math.floor((Math.random() * 100) % options.length)];
    }
  }

  game_board_matrix = transalte_tiles(height, width, game_board_matrix);

  let x = 0;
  let y = 0;

  if (game_board_matrix[0][1] == " ") {
    game_board_matrix[0][1] = "p";
    y = 1;
  } else {
    game_board_matrix[1][0] = "p";
    x = 1;
  }
  return { game_board_matrix, x, y };
}
