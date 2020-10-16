require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use((req, res) =>
  res.send(`
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
  </head>
  <body style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; min-height: 100vh;">
    <h1>Oops, the content you are searching for is not here</h1>
  </body>
  </html>
`)
);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on development on PORT ${PORT}`));
