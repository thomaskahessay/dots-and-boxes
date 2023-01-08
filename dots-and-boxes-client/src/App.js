import "./App.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Grid,
  Modal,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { Stage, Layer, Circle, Line, Rect } from "react-konva";
import React from "react";
import { useEffect, useState } from "react";
import dotsandboxes from "./images/dotsandboxes.png";

function App(props) {
  /* Colors */
  let color1 = "#2a9d8f";
  let color2 = "#e9c46a";
  let color3 = "#e76f51";

  /** Socket for communication */
  let socket = props.socket;

  /* Window States */
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(
    window.innerHeight > 600 ? 600 : window.innerHeight
  );

  /* Grid Structure - Lines are part of the grid */

  /* Calculates the length of the line */
  const [lineLength, setLineLength] = useState(
    0.2 * window.innerWidth > 150 ? 150 : 0.2 * window.innerWidth
  );

  /* Handles centering of the grid */
  const [paddingWidth, setPaddingWidth] = useState(
    (width - 3 * lineLength) / 2
  );
  const [paddingHeight, setPaddingHeight] = useState(window.innerHeight * 0.1);

  /* Lines have an x and y coordinate, points array to draw the line.
   * highlighted and selected to handle selectection and highlighting,
   * and dir to say if the line is horizontal or vertical
   */
  const emptyGrid = [
    {
      key: 0,
      id: 0,
      x: paddingWidth,
      y: paddingHeight,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 1,
      id: 1,
      x: paddingWidth + lineLength,
      y: paddingHeight,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 2,
      id: 2,
      x: paddingWidth + lineLength * 2,
      y: paddingHeight,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 3,
      id: 3,
      x: paddingWidth + lineLength * 3,
      y: paddingHeight,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 4,
      id: 4,
      x: paddingWidth,
      y: paddingHeight + lineLength,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 5,
      id: 5,
      x: paddingWidth + lineLength,
      y: paddingHeight + lineLength,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 6,
      id: 6,
      x: paddingWidth + lineLength * 2,
      y: paddingHeight + lineLength,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 7,
      id: 7,
      x: paddingWidth + lineLength * 3,
      y: paddingHeight + lineLength,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 8,
      id: 8,
      x: paddingWidth,
      y: paddingHeight + lineLength * 2,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 9,
      id: 9,
      x: paddingWidth + lineLength,
      y: paddingHeight + lineLength * 2,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 10,
      id: 10,
      x: paddingWidth + lineLength * 2,
      y: paddingHeight + lineLength * 2,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 11,
      id: 11,
      x: paddingWidth + lineLength * 3,
      y: paddingHeight + lineLength * 2,
      points: [0, 0, 0, lineLength],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "vertical",
    },
    {
      key: 12,
      id: 12,
      x: paddingWidth,
      y: paddingHeight,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 13,
      id: 13,
      x: paddingWidth,
      y: paddingHeight + lineLength,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 14,
      id: 14,
      x: paddingWidth,
      y: paddingHeight + lineLength * 2,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 15,
      id: 15,
      x: paddingWidth,
      y: paddingHeight + lineLength * 3,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 16,
      id: 16,
      x: paddingWidth + lineLength,
      y: paddingHeight,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 17,
      id: 17,
      x: paddingWidth + lineLength,
      y: paddingHeight + lineLength,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 18,
      id: 18,
      x: paddingWidth + lineLength,
      y: paddingHeight + lineLength * 2,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 19,
      id: 19,
      x: paddingWidth + lineLength,
      y: paddingHeight + lineLength * 3,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 20,
      id: 20,
      x: paddingWidth + lineLength * 2,
      y: paddingHeight,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 21,
      id: 21,
      x: paddingWidth + lineLength * 2,
      y: paddingHeight + lineLength,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 22,
      id: 22,
      x: paddingWidth + lineLength * 2,
      y: paddingHeight + lineLength * 2,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
    {
      key: 23,
      id: 23,
      x: paddingWidth + lineLength * 2,
      y: paddingHeight + lineLength * 3,
      points: [0, 0, lineLength, 0],
      highlighted: false,
      selected: false,
      player: 0,
      dir: "horizontal",
    },
  ];

  /* React states */

  /* Modal States */
  const [modalOpen, setModalOpen] = useState(true);
  const [endModal, setEndModal] = useState(false);
  const [gameCode, setGameCode] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /* Player states */
  const [name, setName] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player3Name, setPlayer3Name] = useState("");
  const [oneScore, setOneScore] = useState(0);
  const [twoScore, setTwoScore] = useState(0);
  const [threeScore, setThreeScore] = useState(0);
  const [player, setPlayer] = useState(-1);

  /** Game states */
  const [currentTurn, setCurrentTurn] = useState(3);
  const [endText, setEndText] = useState("");
  const [gameText, setGameText] = useState("");

  /* Grid display states */
  const [lines, setLines] = useState(emptyGrid);
  const [fillSquare, setFillSquare] = useState([]);

  /* Use Effect for handling server responses */
  useEffect(() => {
    /* Player joining */
    socket.on("player_joined", (data) => {
      setPlayer(data.player);
      localStorage.setItem("player", data.player);
      localStorage.setItem("game-code", data.code);
      setGameText(data.msg);
      if (data.player === 0) {
        setPlayer1Name("You");
      } else if (data.player === 1) {
        setPlayer2Name("You");
      } else if (data.player === 2) {
        setPlayer3Name("You");
      }
      setModalOpen(false);
    });

    /* Game code invalid */
    socket.on("cannot_join", () => {
      setError(true);
      setErrorMessage("Game code invalid.");
    });

    /* Game is full */
    socket.on("game_full", () => {
      setError(true);
      setErrorMessage("Game full.");
    });

    /* Update player 1 name */
    socket.on("update_player1_name", (data) => {
      setPlayer1Name(data);
    });

    /* Update player 2 name */
    socket.on("update_player2_name", (data) => {
      setPlayer2Name(data);
    });

    /* Update player 3 name */
    socket.on("update_player3_name", (data) => {
      setPlayer3Name(data);
    });

    /** Update the game text */
    socket.on("message", (data) => {
      setGameText(data);
    });

    /* Start game */
    socket.on("start_game", (data) => {
      setCurrentTurn(data);
    });

    /* Update board with new line */
    socket.off("board_update");
    socket.on("board_update", (data) => {
      receiveUpdateLine(data.id, data.player, data.updatedList);
    });

    /* Update squares with new filled squares */
    socket.on("update_squares", (data) => {
      setFillSquare(data);
    });

    /* Update the current turn */
    socket.on("turn_update", (data) => {
      setCurrentTurn(data);
    });

    /* Update player 1 score */
    socket.on("player1_update", (data) => {
      setOneScore(data);
    });

    /* Update player 2 score */
    socket.on("player2_update", (data) => {
      setTwoScore(data);
    });

    /* Update player 3 score */
    socket.on("player3_update", (data) => {
      setThreeScore(data);
    });

    /* Reconnect to the game */
    socket.off("reconnected");
    socket.on("reconnected", (data) => {
      setPlayer1Name(data.player1Name);
      setPlayer2Name(data.player2Name);
      setPlayer3Name(data.player3Name);
      setOneScore(data.player1Score);
      setTwoScore(data.player2Score);
      setThreeScore(data.player3Score);
      setGameText(data.gameStatus);
      if (data.gameStatus === "Game Started") {
        setCurrentTurn(data.currentTurn);
        rebuildBoard(data.gameBoard, data.filledSquares);
      }
    });

    /* Handles player leaving */
    socket.on("player_left", () => {
      setEndModal(true);
      setEndText("A player left. Find a new game?");
      setOneScore(0);
      setTwoScore(0);
      setThreeScore(0);
      setCurrentTurn(3);
      setPlayer(-2);
      setPlayer1Name("");
      setPlayer2Name("");
      setPlayer3Name("");
      setLines(emptyGrid);
      setError(false);
      setErrorMessage("");
      setGameCode("");
      setGameText("");
      setFillSquare([]);
      localStorage.clear();
    });

    /* Restart game */
    socket.on("restarted", (data) => {
      restart();
    });
  }, [socket]);

  /* Use Effect for handling when the game ends */
  useEffect(() => {
    if (oneScore + twoScore + threeScore === 9) {
      endGame();
    }
  }, [oneScore, twoScore, threeScore]);

  /* Use Effect for handling cookies/local storage */
  useEffect(() => {
    let play = localStorage.getItem("player");
    let code = localStorage.getItem("game-code");

    if (play && code) {
      setModalOpen(false);
      setPlayer(Number(play));
      setGameCode(code);
      socket.emit("reconnect", { code });
    }
  }, []);

  /* Functions */

  /**
   * Rebuilds the board if player refreshes or opens new tab
   * @param gameLines lines of the game
   * @param squares filled squares in the game
   */
  const rebuildBoard = (gameLines, squares) => {
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (gameLines[i].selected) {
        let line = {
          ...lines[i],
          selected: true,
          player: gameLines[i].player,
          highlighted: false,
        };
        newLines.push(line);
      } else {
        newLines.push(lines[i]);
      }
    }
    setLines(newLines);

    for (let i = 0; i < squares.length; i++) {
      let input = [];
      input.push(squares[i].square);
      colourSquare(input, squares[i].player);
    }
  };

  /*
   * Updates the line to the current players colour if it hasn't been selected
   */
  const updateLine = (mouseX, mouseY) => {
    let updated = false;
    let lineId = getClosestLineId(mouseX, mouseY);
    let updatedList = [];

    if (lineId !== 100) {
      updatedList = lines.map((line) => {
        if (line.id === lineId && !line.selected) {
          updated = true;
          return {
            ...line,
            highlighted: false,
            selected: true,
            player: currentTurn,
          };
        } else {
          return {
            ...line,
            highlighted: false,
          };
        }
      });
      setLines(updatedList);
    }

    if (updated) {
      checkSquares(lineId, true, updatedList);
      updateBoard(lineId, currentTurn, updatedList);
    }
  };

  /**
   * Handles receiving the line update from the server
   * @param lineId the line id
   * @param player the player id
   * @param updatedList the updated list of lines
   */
  const receiveUpdateLine = (lineId, player, updatedList) => {
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (updatedList[i].selected) {
        let line = {
          ...lines[i],
          selected: true,
          player: updatedList[i].player,
          highlighted: false,
        };
        newLines.push(line);
      } else {
        newLines.push(lines[i]);
      }
    }
    setLines(newLines);
    checkSquares(lineId, false, updatedList, player);
  };

  /*
   * Gets the current colour of the player
   * @param player the current player 0, 1, or 2
   * @returns a colour, "red", "green", or "blue"
   */
  const getColour = (player) => {
    if (player === 0) {
      return color1;
    } else if (player === 1) {
      return color2;
    } else if (player === 2) {
      return color3;
    }
  };

  /*
   * Checks if any squares are completed and updates score
   * @param id the id of the line that was most recently selected
   */
  const checkSquares = (id, update, updatedLines, gamePlayer = "") => {
    let squares = [
      [0, 1, 12, 13],
      [4, 5, 13, 14],
      [8, 9, 14, 15],
      [1, 2, 16, 17],
      [5, 6, 17, 18],
      [9, 10, 18, 19],
      [2, 3, 20, 21],
      [6, 7, 21, 22],
      [10, 11, 22, 23],
    ];
    let numScored = 0;
    let countedSquares = [];

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].includes(id)) {
        let count = 0;
        for (let j = 0; j < squares[i].length; j++) {
          if (updatedLines.find((line) => line.id === squares[i][j]).selected) {
            count++;
          }
        }
        if (count === 4) {
          numScored++;
          countedSquares.push(squares[i]);
        }
      }
    }
    if (gamePlayer === "") {
      for (let i = 0; i < countedSquares.length; i++) {
        let data = {
          code: gameCode,
          square: countedSquares[i],
          player: player,
        };
        socket.emit("update_squares", data);
      }
    }

    if (numScored > 0 && update) {
      if (currentTurn === 0) {
        let newScore = oneScore + numScored;
        updatePlayer1Score(newScore);
        setOneScore(newScore);
        colourSquare(countedSquares);
      } else if (currentTurn === 1) {
        let newScore = twoScore + numScored;
        updatePlayer2Score(newScore);
        setTwoScore(newScore);
        colourSquare(countedSquares);
      } else if (currentTurn === 2) {
        let newScore = threeScore + numScored;
        updatePlayer3Score(newScore);
        setThreeScore(newScore);
        colourSquare(countedSquares);
      }
    } else if (numScored === 0 && update) {
      updateTurn();
    } else if (!update && gamePlayer !== "") {
      colourSquare(countedSquares, gamePlayer);
    }
  };

  /*
   * Restarts the game
   */
  const restart = () => {
    setOneScore(0);
    setTwoScore(0);
    setThreeScore(0);
    setCurrentTurn(0);
    setLines(emptyGrid);
    setEndText("");
    setFillSquare([]);
    setEndModal(false);
  };

  /**
   * Starts a new game at the end of the last game
   * @param type join or new game
   */
  const newGame = (type) => {
    setOneScore(0);
    setTwoScore(0);
    setThreeScore(0);
    setCurrentTurn(3);
    setPlayer(-1);
    setPlayer1Name("");
    setPlayer2Name("");
    setPlayer3Name("");
    setLines(emptyGrid);
    setError(false);
    setErrorMessage("");
    setEndText("");
    setFillSquare([]);
    setEndModal(false);
    joinGame(type);
  };

  /*
   * Handles determining winner of the game
   */
  const endGame = () => {
    let winningNum = Math.max(oneScore, twoScore, threeScore);
    if (
      oneScore === twoScore &&
      oneScore === threeScore &&
      oneScore === winningNum
    ) {
      setEndText(
        `${player1Name}, ${player2Name}, and ${player3Name} Tied - Score: ` +
          oneScore
      );
    } else if (oneScore === threeScore && oneScore === winningNum) {
      setEndText(`${player1Name} and ${player3Name} Tied - Score: ` + oneScore);
    } else if (twoScore === threeScore && twoScore === winningNum) {
      setEndText(`${player2Name} and ${player3Name} Tied - Score: ` + twoScore);
    } else if (oneScore === twoScore && oneScore === winningNum) {
      setEndText(`${player1Name} and ${player2Name} Tied - Score: ` + oneScore);
    } else if (oneScore === winningNum) {
      setEndText(`Winner: ${player1Name} - Score: ` + oneScore);
    } else if (twoScore === winningNum) {
      setEndText(`Winner: ${player2Name} - Score: ` + twoScore);
    } else if (threeScore === winningNum) {
      setEndText(`Winner: ${player3Name} - Score: ` + threeScore);
    }
    setGameText("Game over");
    setGameCode("");
    setEndModal(true);
  };

  /*
   * Colours the square based on the ids of the lines the square is composed of
   * @param squareIds array of squares that have been completed most recently
   * @param player the player who completed the squares
   */
  const colourSquare = (squareIds, player = currentTurn) => {
    for (let i = 0; i < squareIds.length; i++) {
      let colour = "";
      if (player === 0) {
        colour = color1;
      } else if (player === 1) {
        colour = color2;
      } else if (player === 2) {
        colour = color3;
      }

      let linesInSquare = getLines(squareIds[i]);
      let coordinates = getTopLeftPoint(linesInSquare);
      let square = {
        x: coordinates.x,
        y: coordinates.y,
        width: lineLength,
        height: lineLength,
        fill: colour,
      };
      setFillSquare((fillSquare) => [...fillSquare, square]);
    }
  };

  /*
   * Helper for the colourSquare function that gets the lines based on their ids
   * @param ids array of ids in the square
   * @returns array of lines
   */
  const getLines = (ids) => {
    let res = [];
    for (let i = 0; i < ids.length; i++) {
      res.push(lines.find((line) => line.id === ids[i]));
    }
    return res;
  };

  /*
   * Helper function for colourSquare funciton that gets the top left point of the square based on the lines
   * @param lines the lines in the square
   * @returns the top left point of the square
   */
  const getTopLeftPoint = (lines) => {
    let x = Number.MAX_SAFE_INTEGER;
    let y = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].x < x) {
        x = lines[i].x;
      }
      if (lines[i].y < y) {
        y = lines[i].y;
      }
    }
    return { x, y };
  };

  /*
   * Handles highlighting the closest line in the grid
   * @param mouseX the mouse's xpos on the stage
   * @param mouseY the mouse's ypos on the stage
   */
  const updateHighlight = (mouseX, mouseY) => {
    let minLineId = getClosestLineId(mouseX, mouseY);

    if (minLineId !== 100) {
      let updatedList = lines.map((line) => {
        if (line.id === minLineId && !line.selected) {
          return { ...line, highlighted: true };
        } else {
          return { ...line, highlighted: false };
        }
      });
      setLines(updatedList);
    }
  };

  /**
   *  Gets the id of the closest line to the mouse
   * @param mouseX the mouse's xpos on the stage
   * @param mouseY the mouse's ypos on the stage
   * @returns the id of the closest line
   */
  const getClosestLineId = (mouseX, mouseY) => {
    let minDist = Number.MAX_SAFE_INTEGER;
    let minLineId = 100;
    for (const line of lines) {
      if (line.dir === "horizontal") {
        if (
          Math.abs(mouseY - line.y) < minDist &&
          mouseX > line.x &&
          mouseX < line.x + lineLength
        ) {
          minDist = Math.abs(mouseY - line.y);
          minLineId = line.id;
        }
      } else if (line.dir === "vertical") {
        if (
          Math.abs(mouseX - line.x) < minDist &&
          mouseY > line.y &&
          mouseY < line.y + lineLength
        ) {
          minDist = Math.abs(mouseX - line.x);
          minLineId = line.id;
        }
      }
    }
    return minLineId;
  };

  /* Server Communication */

  /**
   * Join a game or start a new one
   * @param gameType join or new game
   */
  const joinGame = (gameType) => {
    if (gameCode !== "" && gameType === "join") {
      let data = {
        type: "join",
        code: gameCode,
        name: name,
      };
      socket.emit("join_game", data);
    } else {
      let gCode = Math.floor(Math.random() * 9999) + 1000;
      gCode = gCode.toString();
      setGameCode(gCode);
      let data = {
        type: "new",
        code: gCode,
        name: name,
      };
      socket.emit("join_game", data);
    }
  };

  /**
   * Updates the board after a players turn
   * @param id the line id
   * @param player the player id
   * @param updatedList the updated list of lines
   */
  const updateBoard = (id, player, updatedList) => {
    let data = {
      code: gameCode,
      lineId: id,
      player: player,
      updatedBoard: updatedList,
    };
    socket.emit("update_board", data);
  };

  /**
   * Updates the current turn
   */
  const updateTurn = () => {
    let turn = 3;
    if (currentTurn < 2) {
      turn = currentTurn + 1;
    } else {
      turn = 0;
    }
    let data = {
      code: gameCode,
      turn: turn,
    };
    socket.emit("update_turn", data);
  };

  /**
   * Updates player 1's score
   * @param score
   */
  const updatePlayer1Score = (score) => {
    let data = {
      code: gameCode,
      score: score,
    };
    socket.emit("update_player1_score", data);
  };

  /**
   * Updates player 2's score
   * @param score
   */
  const updatePlayer2Score = (score) => {
    let data = {
      code: gameCode,
      score: score,
    };
    socket.emit("update_player2_score", data);
  };

  /**
   * Updates player 3's score
   * @param score
   */
  const updatePlayer3Score = (score) => {
    let data = {
      code: gameCode,
      score: score,
    };
    socket.emit("update_player3_score", data);
  };

  /**
   * Restarts the game
   */
  const restartGame = () => {
    let data = {
      code: gameCode,
    };
    socket.emit("restart", data);
  };

  /**
   * Leave the game
   */
  const leaveGame = () => {
    let data = {
      code: gameCode,
      player: player,
    };
    socket.emit("leave_game", data);
    setOneScore(0);
    setTwoScore(0);
    setThreeScore(0);
    setCurrentTurn(3);
    setPlayer(-1);
    setPlayer1Name("");
    setPlayer2Name("");
    setPlayer3Name("");
    setLines(emptyGrid);
    setError(false);
    setErrorMessage("");
    setFillSquare([]);
    localStorage.clear();
    setModalOpen(true);
  };

  return (
    <Box>
      <Modal open={modalOpen} className='start-modal'>
        <Paper className='modal-content'>
          <img
            src={dotsandboxes}
            className='dots-and-boxes-img'
            alt='Dots and boxes'
          ></img>
          <Typography
            className='modal-header'
            variant='h5'
            style={{ marginBottom: "10px" }}
          >
            Welcome to Dots and Boxes!
          </Typography>
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            variant='outlined'
            label='Name'
            size='small'
            className='name-field'
            style={{ marginBottom: "10px" }}
          />
          <TextField
            onChange={(e) => {
              setGameCode(e.target.value);
            }}
            variant='outlined'
            label='Game Code'
            size='small'
            className='game-code-field'
            style={{ margiBottom: "10px" }}
            error={error}
            helperText={errorMessage}
          />
          <Grid container spacing={1} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <Button
                className='start-btn'
                variant='contained'
                color='primary'
                disabled={gameCode === "" ? true : false}
                onClick={() => {
                  joinGame("join");
                }}
              >
                Join Game
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className='start-btn'
                variant='contained'
                color='primary'
                onClick={() => {
                  joinGame("new");
                  setModalOpen(false);
                }}
              >
                New Game
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      {player !== -1 && (
        <div>
          <AppBar
            position='static'
            className='header'
            style={{ backgroundColor: "#264653" }}
          >
            <Toolbar>
              <Typography variant='h6' component='div' className='header-text'>
                Dots and Boxes
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className='score' elevation={3}>
                {player1Name !== "" && (
                  <Typography
                    variant='h6'
                    color={currentTurn === 0 ? color1 : "black"}
                  >
                    {player1Name} Score: {oneScore}
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className='score' elevation={3}>
                {player2Name !== "" && (
                  <Typography
                    variant='h6'
                    color={currentTurn === 1 ? color2 : "black"}
                  >
                    {player2Name} Score: {twoScore}
                  </Typography>
                )}
                {player2Name === "" && (
                  <Typography
                    variant='h6'
                    color={currentTurn === 1 ? color2 : "black"}
                  >
                    Player 2 Score: {twoScore}
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className='score' elevation={3}>
                {player3Name !== "" && (
                  <Typography
                    variant='h6'
                    color={currentTurn === 2 ? color3 : "black"}
                  >
                    {player3Name} Score: {threeScore}
                  </Typography>
                )}
                {player3Name === "" && (
                  <Typography
                    variant='h6'
                    color={currentTurn === 2 ? color3 : "black"}
                  >
                    Player 3 Score: {twoScore}
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
          {(gameCode !== "" || gameText !== "") && (
            <Paper elevation={6} className='info-paper'>
              <Typography variant='h5' className='game-code'>
                Game Code: {gameCode}
              </Typography>
              <Typography variant='h5' className='game-status'>
                Game Status: {gameText}
              </Typography>
            </Paper>
          )}
          {gameText === "Game Started" && (
            <Box textAlign='center'>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  restart();
                  restartGame();
                }}
                className='restart-btn'
                style={{ marginRight: "10px" }}
              >
                Restart
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  leaveGame();
                }}
                className='restart-btn'
                style={{ marginRight: "10px" }}
              >
                Leave
              </Button>
            </Box>
          )}
          <Box className='game-board' textAlign='center'>
            <Stage
              width={width}
              height={height}
              onMouseMove={(e) => {
                if (player === currentTurn) {
                  const mousePos = e.target.getStage().getPointerPosition();
                  updateHighlight(mousePos.x, mousePos.y);
                }
              }}
              onClick={(e) => {
                if (player === currentTurn) {
                  const mousePos = e.target.getStage().getPointerPosition();
                  updateLine(mousePos.x, mousePos.y);
                }
              }}
              className='stage'
            >
              <Layer>
                {fillSquare.map((square) => {
                  return (
                    <Rect
                      x={square.x}
                      y={square.y}
                      width={square.width}
                      height={square.height}
                      fill={square.fill}
                      opacity={0.3}
                    />
                  );
                })}
              </Layer>
              <Layer>
                {lines.map((line) => {
                  return (
                    <Line
                      x={line.x}
                      y={line.y}
                      points={line.points}
                      stroke={"grey"}
                      strokeWidth={3}
                      opacity={0.5}
                      dash={[5, 10]}
                    />
                  );
                })}
              </Layer>
              <Layer>
                {lines.map((line) => {
                  return (
                    <Line
                      x={line.x}
                      y={line.y}
                      points={line.points}
                      stroke={
                        line.selected ? getColour(line.player) : "rgba(0,0,0,0)"
                      }
                      strokeWidth={7}
                    />
                  );
                })}
              </Layer>
              <Layer>
                {lines.map((line) => {
                  return (
                    <Line
                      x={line.x}
                      y={line.y}
                      points={line.points}
                      stroke={
                        line.highlighted
                          ? getColour(currentTurn)
                          : "rgba(0,0,0,0)"
                      }
                      strokeWidth={7}
                    />
                  );
                })}
              </Layer>
              <Layer>
                <Circle
                  x={paddingWidth}
                  y={paddingHeight}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength}
                  y={paddingHeight}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 2}
                  y={paddingHeight}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 3}
                  y={paddingHeight}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth}
                  y={paddingHeight + lineLength}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength}
                  y={paddingHeight + lineLength}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 2}
                  y={paddingHeight + lineLength}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 3}
                  y={paddingHeight + lineLength}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth}
                  y={paddingHeight + lineLength * 2}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength}
                  y={paddingHeight + lineLength * 2}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 2}
                  y={paddingHeight + lineLength * 2}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 3}
                  y={paddingHeight + lineLength * 2}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth}
                  y={paddingHeight + lineLength * 3}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength}
                  y={paddingHeight + lineLength * 3}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 2}
                  y={paddingHeight + lineLength * 3}
                  radius={10}
                  fill='black'
                ></Circle>
                <Circle
                  x={paddingWidth + lineLength * 3}
                  y={paddingHeight + lineLength * 3}
                  radius={10}
                  fill='black'
                ></Circle>
              </Layer>
            </Stage>
          </Box>
          <Modal open={endModal} className='end-modal'>
            <Paper className='modal-content'>
              <Typography className='modal-header' variant='h5'>
                {endText}
              </Typography>
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                }}
                variant='outlined'
                label='Name'
                size='small'
                className='name-field'
                style={{ marginBottom: "10px" }}
              />
              <TextField
                onChange={(e) => {
                  setGameCode(e.target.value);
                }}
                variant='outlined'
                label='Game Code'
                size='small'
                className='game-code-field'
                style={{ marginBottom: "10px" }}
                error={error}
                helperText={errorMessage}
              />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    className='start-btn'
                    variant='contained'
                    color='primary'
                    disabled={gameCode === "" ? true : false}
                    onClick={() => {
                      newGame("join");
                    }}
                  >
                    Join Game
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    className='start-btn'
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      newGame("new");
                    }}
                  >
                    New Game
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Modal>
        </div>
      )}
    </Box>
  );
}

export default App;
