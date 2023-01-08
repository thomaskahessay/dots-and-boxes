import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
app.use(cors());

const server = http.createServer(app);

let roomsAndPlayers = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  /** Join a game */
  socket.on("join_game", (data) => {
    let room = roomsAndPlayers.find((room) => room.code === data.code);
    if (!room && data.type !== "new") {
      socket.emit("cannot_join", {});
    }
    if (!room && data.type == "new") {
      roomsAndPlayers.push({
        code: data.code,
        player1: socket.id,
        player2: "",
        player3: "",
        currentTurn: 0,
        player1Score: 0,
        player2Score: 0,
        player3Score: 0,
        player1Name: data.name,
        player2Name: "",
        player3Name: "",
        gameStatus: "Waiting for 2 players",
        gameBoard: [],
        filledSquares: [],
      });
      socket.join(data.code);
      let response = {
        player: 0,
        name: data.name,
        msg: "Waiting for 2 players",
        code: data.code,
      };
      socket.emit("player_joined", response);
    } else if (room && room.player2 == "") {
      let roomIndex = roomsAndPlayers.findIndex(
        (obj) => obj.code === room.code
      );
      roomsAndPlayers[roomIndex].player2 = socket.id;
      roomsAndPlayers[roomIndex].playersJoined = 2;
      roomsAndPlayers[roomIndex].player2Name = data.name;
      roomsAndPlayers[roomIndex].gameStatus = "Waiting for 1 player";
      socket.join(data.code);
      let response = {
        player: 1,
        name: data.name,
        msg: "Waiting for 1 player",
        code: data.code,
      };
      socket.emit("player_joined", response);
      socket.emit(
        "update_player1_name",
        roomsAndPlayers[roomIndex].player1Name
      );
      socket.broadcast.to(room.code).emit("update_player2_name", data.name);
      socket.broadcast.to(room.code).emit("message", "Waiting for 1 player");
    } else if (room && room.player3 == "") {
      let roomIndex = roomsAndPlayers.findIndex(
        (obj) => obj.code === room.code
      );
      roomsAndPlayers[roomIndex].player3 = socket.id;
      roomsAndPlayers[roomIndex].playersJoined = 3;
      roomsAndPlayers[roomIndex].currentTurn = 0;
      roomsAndPlayers[roomIndex].player3Name = data.name;
      roomsAndPlayers[roomIndex].gameStatus = "Game Started";
      socket.join(data.code);
      let response = {
        player: 2,
        name: data.name,
        msg: "Game Started",
        currentTurn: 0,
        code: data.code,
      };
      socket.emit("player_joined", response);
      socket.broadcast.to(room.code).emit("message", "Game Started");
      socket.emit("start_game", 0);
      socket.emit(
        "update_player1_name",
        roomsAndPlayers[roomIndex].player1Name
      );
      socket.emit(
        "update_player2_name",
        roomsAndPlayers[roomIndex].player2Name
      );
      socket.broadcast.to(room.code).emit("update_player3_name", data.name);
      socket.broadcast.to(room.code).emit("start_game", 0);
    } else if (room && room.player3 != "") {
      socket.emit("game_full", {});
    }
  });

  /** Update the board */
  socket.on("update_board", (data) => {
    let response = {
      id: data.lineId,
      player: data.player,
      updatedList: data.updatedBoard,
    };
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers[roomIndex].gameBoard = data.updatedBoard;
    socket.broadcast.to(data.code).emit("board_update", response);
  });

  /** Update Squares */
  socket.on("update_squares", (data) => {
    let square = {
      square: data.square,
      player: data.player,
    };
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers[roomIndex].filledSquares.push(square);
  });

  /** Update the current turn */
  socket.on("update_turn", (data) => {
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers[roomIndex].currentTurn = data.turn;
    let response = data.turn;
    socket.emit("turn_update", response);
    socket.broadcast.to(data.code).emit("turn_update", response);
  });

  /** Update the score for player1 */
  socket.on("update_player1_score", (data) => {
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers[roomIndex].player1Score = data.score;
    let response = data.score;
    socket.broadcast.to(data.code).emit("player1_update", response);
  });

  /** Update the score for player2 */
  socket.on("update_player2_score", (data) => {
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers[roomIndex].player2Score = data.score;
    let response = data.score;
    socket.broadcast.to(data.code).emit("player2_update", response);
  });

  /** Update the score for player3 */
  socket.on("update_player3_score", (data) => {
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers[roomIndex].player3Score = data.score;
    let response = data.score;
    socket.broadcast.to(data.code).emit("player3_update", response);
  });

  /** Restart the game */
  socket.on("restart", (data) => {
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers[roomIndex] = {
      ...roomsAndPlayers[roomIndex],
      currentTurn: 0,
      gameBoard: [],
      filledSquares: [],
      player1Score: 0,
      player2Score: 0,
      player3Score: 0,
    };
    let response = "restarted";
    socket.broadcast.to(data.code).emit("restarted", response);
  });

  /** Reconnect logic */
  socket.on("reconnect", (data) => {
    socket.join(data.code);
    let room = roomsAndPlayers.find((room) => room.code === data.code);
    socket.emit("reconnected", room);
  });

  /** User leaves game */
  socket.on("leave_game", (data) => {
    socket.broadcast.to(data.code).emit("player_left", {});
    let roomIndex = roomsAndPlayers.findIndex((obj) => obj.code === data.code);
    roomsAndPlayers.splice(roomIndex, 1);
  });

  /** User disconnects */
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
