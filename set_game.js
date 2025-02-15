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

export function generate_maze(x, y, graph, game_board_matrix) {
  const options = new Set([0, 1, 2, 3]);
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  for (let i = 0; i < 4; i++) {
    //random pick from options and delete that element from options
    let options_array = Array.from(options);
    console.log(options_array);
    let op =
      options_array[Math.floor((Math.random() * 100) % options_array.length)];
    options.delete(op);
    let nx = x + dx[op];
    let ny = y + dy[op];

    if (
      nx >= 0 &&
      nx < graph.length &&
      ny >= 0 &&
      ny < graph[0].length &&
      graph[nx][ny] == 0
    ) {
      game_board_matrix[2 * x + dx[op] + 1][2 * y + dy[op] + 1] = " ";
      graph[nx][ny] = 1;
      generate_maze(nx, ny, graph, game_board_matrix);
    }
  }
}

export function set_game_board_matrix(height, width) {
  const game_board_matrix = [];
  const graph = [];

  for (let i = 0; i < 2 * height + 1; i++) {
    game_board_matrix[i] = [];
    for (let j = 0; j < 2 * width + 1; j++) {
      if (i % 2 == 1 && j % 2 == 1) {
        game_board_matrix[i][j] = " ";
      } else {
        game_board_matrix[i][j] = "*";
      }
    }
  }

  for (let i = 0; i < height; i++) {
    graph[i] = [];
    for (let j = 0; j < width; j++) {
      graph[i][j] = 0;
    }
  }

  generate_maze(0, 0, graph, game_board_matrix);

  game_board_matrix[0][1] = "p";
  game_board_matrix[2 * height][2 * width - 1] = " ";

  return game_board_matrix;
}
