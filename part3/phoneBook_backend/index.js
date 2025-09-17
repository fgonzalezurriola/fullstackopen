const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/persons");
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

// app.get("/info", (request, response) => {
//   const people = persons.length;
//   const date = new Date();
//   const res1 = `<p>Phonebook has info for ${people} people</p>`;
//   const res2 = `<p>${date}</p>`;
//   const res = res1 + res2;
//   response.send(res);
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);
//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

// app.post("/api/persons", (request, response) => {
//   const { name, number } = request.body;

//   if (!name.trim() || !number) {
//     return response.status(400).json({ error: "missing content, name and number are required" });
//   }

//   if (persons.some((person) => person.name === name)) {
//     return response.status(400).json({ error: "name must be unique" });
//   }

//   const resPerson = { id: Math.floor(Math.random() * 10e8), name: name, number: number };
//   persons = persons.concat(resPerson);
//   response.json(resPerson);
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
