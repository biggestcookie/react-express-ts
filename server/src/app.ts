import express, { json, urlencoded } from "express";

const port = process.env.PORT || 8080;

const app = express();

app.use(json());
app.use(urlencoded());

app.listen(port, () => console.log(`Server listening on ${port.toString()}!`));
