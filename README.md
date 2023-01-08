# Dots-and-boxes
Dots and Boxes game created using React.js, Node.js and Express. Three player game where players take turns drawing lines on a board to complete squares. The player who completes the most squares wins the game.

## Getting started

### Server:
1. In one terminal, cd into dots-and-boxes/dots-and-boxes-server: `cd dots-and-boxes-server`
2. Install the required dependancies for the server side: `npm i`
3. Start the server locally: `npm start`

The server will run on http://localhost:3001/. Everything is in working order when you see 'Server is running' in the terminal.

### Client:
1. In another terminal, cd into dots-and-boxes/dots-and-boxes-client: `cd dots-and-boxes-client`
2. Install the required dependancies for the client side: `npm i`
3. Start the react application locally: `npm start`

The dots-and-boxes application will run on http://localhost:3000/

### Starting a game
In order to start a game, three users must connect to the same game room. To do this, you MUST open either an incognito tab or a tab with a new browser to allow for a different user to connect. This is because the local storage is used for each tab to remember the user.
