const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/persons");
const persons = require("./models/persons");
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("dist"));

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :response-time ms :body", {
    skip: (req, res) => req.method !== "POST",
  })
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  const newPerson = new Person({ name, number });
  newPerson.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

// 3.15
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end();
    }
    response.status(204).end();
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
