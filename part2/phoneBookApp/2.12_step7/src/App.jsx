// 2.12 begin some changes
import { useState, useEffect } from "react"
import axios from "axios";
const baseUrl = "http://localhost:3001/persons";


const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const personService = {
  getAll: getAll,
  create: create,
  update: update,
};
// end some changes


const Filter = ({ newFilter, setNewFilter }) => {
  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  return (
    <div>
      Filter: <input value={newFilter} onChange={handleNewFilter} />
    </div>
  )
}


const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameChange, handleNumberChange }) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => person.name === personObject.name)
    const numberExists = persons.some(person => person.number === personObject.number)
    if (nameExists) {
      alert(`${personObject.name} name is already added to phonebook`)
      setNewName('')
      return
    }
    if (numberExists) {
      alert(`${personObject.number} number is already added to phonebook`)
      setNewNumber('')
      return
    }

    // 2.12 begin some changes
    personService
      .create(personObject)
      .then(updatedPerson => {
        setPersons(persons.concat(updatedPerson))
      })
    // end some changes

    setNewName('')
    setNewNumber('')
  }


  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit" >add</button></div>
    </form>
  )
}


const Persons = ({ namesToShow }) => {
  return (
    <div>
      {namesToShow.map((person) => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  // 2.12 begin some changes 
  const fetchPersons = () => {
    personService
      .getAll()
      .then(initPersons => { setPersons(initPersons) })
  }

  useEffect(() => {
    fetchPersons()
  }, [])
  // end some changes 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        showAll={showAll}
        setShowAll={setShowAll}
        newFilter={newFilter}
        setNewFilter={setNewFilter}
      />
      <h3>Add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers </h3>
      <Persons
        namesToShow={namesToShow}
      />
    </div>
  )
}


export default App