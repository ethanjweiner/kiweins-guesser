const fs = require("fs");

require("dotenv").config({ path: ".env.local" });

const { SPOTIFY_INIT_ACCESS_TOKEN, SPOTIFY_INIT_REFRESH_TOKEN } = process.env;
console.log(process.env);

const tokens = {
  spotify_access_token: SPOTIFY_INIT_ACCESS_TOKEN,
  spotify_refresh_token: SPOTIFY_INIT_REFRESH_TOKEN,
};

fs.writeFileSync("tokens.json", JSON.stringify(tokens));
