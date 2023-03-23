const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");
const PORT = 2001;
const app = express();

app.use(cors());
app.use(bodyParser());

const {expensesRouter} = require("./router");

app.use("/api", expensesRouter);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
