const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let expenses = []; // Simple in-memory storage

// Home page - Display expenses
app.get("/", (req, res) => {
    res.render("index", { expenses });
});

// Add expense
app.post("/add", (req, res) => {
    const { name, amount } = req.body;
    expenses.push({ id: Date.now(), name, amount });
    res.redirect("/");
});

// Update expense page
app.get("/edit/:id", (req, res) => {
    const expense = expenses.find(exp => exp.id == req.params.id);
    res.render("edit", { expense });
});

// Handle expense update
app.post("/update/:id", (req, res) => {
    const { name, amount } = req.body;
    expenses = expenses.map(exp => exp.id == req.params.id ? { id: exp.id, name, amount } : exp);
    res.redirect("/");
});

// Delete expense
app.get("/delete/:id", (req, res) => {
    expenses = expenses.filter(exp => exp.id != req.params.id);
    res.redirect("/");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});