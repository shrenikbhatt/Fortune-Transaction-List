const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const transactions = require("./routes/api/transactions");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
// Express setup
const app = express();
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/transactions", transactions);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
