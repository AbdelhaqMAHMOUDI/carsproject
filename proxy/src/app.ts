import express from "express";
import bodyParser from "body-parser";

import checkToken from "./middlewares/checkToken";
import userService from "./services/user";

import { urlApi } from "./types";
import axios from "axios";
const app = express();
const port = 8000;


function checkHeaders(req, res, next) {

  if (req.get("authorization")) {

    next();

  } else {

    res.status(400).json({ "Type": "Erreur", "Status": false, "Message": "Il n'y a pas le token dans l'authorization!" });

  }

}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(checkToken());

app.get(urlApi, (_, res) => {
  res.send("Hello API");
});

app.get("/api/.user/future-users", checkHeaders, (req, res) => {

  axios.get("http://nginx/api/future-users/", {
    headers: {

      "authorization": `Bearer ${req.get("authorization").split(' ')[1]}`

    }
  })
    .then((onfulfilled) => res.send(onfulfilled.data))
    .catch((error) => res.send(error.message))
    ;

});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

userService.initUrls(app);