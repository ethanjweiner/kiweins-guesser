const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: ".env.local" });

const { SPOTIFY_INIT_ACCESS_TOKEN, SPOTIFY_INIT_REFRESH_TOKEN } = process.env;

const tokens = {
  spotify_access_token: SPOTIFY_INIT_ACCESS_TOKEN,
  spotify_refresh_token: SPOTIFY_INIT_REFRESH_TOKEN,
};

const tokensPath = path.resolve(path.join(process.cwd(), "tokens.json"));

fs.writeFileSync(tokensPath, JSON.stringify(tokens));
