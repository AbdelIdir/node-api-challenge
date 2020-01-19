/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, just API

Go code!
*/
require("dotenv").config();
const projectRouter = require("./projects_router");
const actionRouter = require("./actions_router");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

/* needs to be agreeable for both my computer ,and HEROKU */
const port = process.env.PORT || 4100;

const app = express();

app.use(express.static("client/build"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRouter);
app.use("/api/actions", actionRouter);

app.get("/api/landing", (req, res) => {
  res.json(`hello, ${req.query.name}! welcome to my page`);
});

app.use((req, res) => {
  res.json("This API is alive");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
