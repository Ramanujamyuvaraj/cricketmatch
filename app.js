const express = require("express");

const sqlite3 = require("sqlite3");

const { open } = require("sqlite");

const path = require("path");

const dbPath = path.join(__dirname, "cricketMatchDetails.db");

const app = express();

app.use(express.json());

let db = null;

const initializeDbToServer = () => {
  try {
    db = open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3001, () => {
      console.log("Server Running");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

initializeDbToServer();

// GET players Name

app.get("/players/:player_id/", async (request, response) => {
  const { player_id } = request.params;
  const getPlayersList = `
    SELECT * FROM player_details WHERE player_id = ${player_id};`;

  const playerDataBase = await db.get(getPlayersList);

  response.send(playerDataBase);
});
