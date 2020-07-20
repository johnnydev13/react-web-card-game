### A web card game.

The game with minimum 2 and maximum 5 players

**The game rules** 

>
> - standard deck of 52 cards
> - 10 cards per user per game
> - play direction is clockwise
> - each player throws a single card, the highest card wins and takes all
> - in case there are more than one high cards, the last player who played wins
> - end of game is when all players are out of cards in their hands
> - the winner is the player who has the highest sum of all taken cards; in case of more than one player with same sum, there will be more than one winner

#### Installation

Both a client nor a server require separate installation

##### Get the repo

```sh
git clone git@github.com:johnnydev13/react-web-card-game.git
cd react-web-card-game
```

##### Setting up the server

by default the server listens to 3002 port, to change a port edit `server/src/config/server.js` config file

```sh
cd server
npm install
npm start
```

##### Setting up the client

by default the client connects to `http://localhost:3002` using web socket client, to change the url edit `client/src/config/api.js`

```sh
cd client
npm install
npm start
```

#### Animation

All animation setting (such as speed and card positions on a deal area) stores in `client/src/config/animation.js` config file.
