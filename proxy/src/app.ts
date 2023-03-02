import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

app.use(cors({
  origin: '*'
}));

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


app.post("/api/.user/register", (req, res) => {

  console.log(req.body);

  axios.post("http://nginx/api/register/", {
    lastname: req.body.nom,
    firstname: req.body.prenom,
    email: req.body.email,
    country: req.body.nationalite,
    phonenumber: req.body.numero_tel
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then((onfulfilled) => res.send(onfulfilled.data))
    .catch((error) => res.send({ error: error, data: req.body }))
    ;

});


// get all cars
app.get('/api/cars', (req, res) => {

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  axios.get('http://localhost:5000/cars', options
  ).then((response) => {
    console.log(response)
    // sent code
    res.status(response.status);
    res.send(response.data);
  }
  ).catch((error) => {
    console.log(error)
    res.send(error.response.data);
    res.status(error.response.data.code);
  }
  )

});

app.get('/api/admin', (req, res) => {

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }
  }

  axios.get('http://nginx/api/admin', options
  ).then((response) => {
    console.log(response)
    // sent code
    res.status(response.status);
    res.send(response.data);
  }
  ).catch((error) => {
    console.log(error)
    res.send(error.response.data);
    res.status(error.response.data.code);
  }
  )


});



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

userService.initUrls(app);