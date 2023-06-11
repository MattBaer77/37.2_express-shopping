const express = require("express")
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")
const morgan = require("morgan")


app.use(express.json());
app.use(morgan('dev'))
app.use("/items", itemsRoutes);


/** Favicon handler to eliminate nuisance logs */
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204)
})

/** 404 handler */

app.use(function (req, res, next) {
  const e = new ExpressError("Not Found", 404);
  next(e)
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;