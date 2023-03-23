const fs = require("fs");

module.exports = {
  get_expenses: (req, res) => {
    let expenses = fs.readFileSync("./data/expenses.json");
    res.status(200).send(JSON.parse(expenses));
  },
  get_expenses_detail: (req, res) => {
    let expenses = JSON.parse(fs.readFileSync("./data/expenses.json"));
    let idx = expenses.findIndex((item) => item.id == req.query.id);

    res.status(200).send(JSON.stringify(expenses[idx]));
  },
  create_expenses: (req, res) => {
    let expenses = JSON.parse(fs.readFileSync("./data/expenses.json"));

    expenses.push(req.body);

    fs.writeFileSync("./data/expenses.json", JSON.stringify(expenses));
    res.status(200).send(JSON.parse(fs.readFileSync("./data/expenses.json")));
  },
  edit_expenses: (req, res) => {
    let expenses = JSON.parse(fs.readFileSync("./data/expenses.json"));
    let idx = expenses.findIndex((item) => item.id == req.query.id);

    for (let prop in expenses[idx]) {
      for (let bodyProp in req.body) {
        if (prop == bodyProp) {
          expenses[idx][prop] = req.body[bodyProp];
        }
      }
    }

    fs.writeFileSync("./data/expenses.json", JSON.stringify(expenses));
    res.status(200).send(JSON.parse(fs.readFileSync("./data/expenses.json")));
  },
  delete_expenses: (req, res) => {
    let expenses = JSON.parse(fs.readFileSync("./data/expenses.json"));
    let idx = expenses.findIndex((item) => item.id == req.query.id);

    expenses.splice(idx, 1);

    fs.writeFileSync("./data/expenses.json", JSON.stringify(expenses));
    res.status(200).send(JSON.parse(fs.readFileSync("./data/expenses.json")));
  },
  get_data_range: (req, res) => {
    let expenses = JSON.parse(fs.readFileSync("./data/expenses.json"));

    if (req.query.category) {
      expenses = expenses.filter((el) => el.category === req.query.category);
    }

    if (req.query.date_start && req.query.date_until) {
      expenses = expenses.filter((expense) => {
        const date = new Date(expense.date);
        const date_start = new Date(req.query.date_start);
        const date_until = new Date(req.query.date_until);
        return date >= date_start && date <= date_until;
      });
    }
    res.status(200).send(JSON.stringify(expenses));
  },
};
