import { useState, useEffect } from "react"
import personService from "./services/persons"

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

    personService
      .create(personObject)
      .then(updatedPerson => {
        setPersons(persons.concat(updatedPerson))
      })

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

  const fetchPersons = () => {
    personService
      .getAll()
      .then(initPersons => { setPersons(initPersons) })
  }

  useEffect(() => {
    fetchPersons()
  }, [])

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