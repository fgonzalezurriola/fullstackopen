import { useState, useEffect } from "react"
import personService from "./services/persons"
import "./index.css"

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

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameChange, handleNumberChange, setSuccessMessage }) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => person.name === personObject.name)
    const numberExists = persons.some(person => person.number === personObject.number)
    if (nameExists && numberExists) {
      alert(`${personObject.name} name is already added to phonebook`)
      setNewName('')
      return
    }
    else if (nameExists && !numberExists) {
      if (window.confirm(`${personObject.name} name is already added to phonebook, replace the old number with a new one?`)) {
        console.log(`(${personObject.name}) replaced number`)
        const person = persons.find(p => p.name === personObject.name)
        const changedPerson = { ...person, number: newNumber }
        const id = changedPerson.id
        personService
          .update(id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : updatedPerson))
          })
        setNewName('')
        setNewNumber('')
        return
      }
      else {
        console.log(`(${personObject.name}) replacing number CANCELLED`)
        return
      }
    }

    else if (numberExists) {
      alert(`${personObject.number} number is already added to phonebook`)
      setNewNumber('')
      return
    }


    personService
      .create(personObject)
      .then(updatedPerson => {
        setPersons(persons.concat(updatedPerson))
      })

    setSuccessMessage(`Added ${personObject.name}`)

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


const Persons = ({ namesToShow, handleDelete }) => {
  return (
    <div>
      {namesToShow.map((person) => (
        <div key={person.id}>
          <p>{person.name}: {person.number}
            <button onClick={(event) => handleDelete(event, person.id, person.name)}>delete</button>
          </p>
        </div>
      ))}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
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
  const [successMessage, setSuccessMessage] = useState(null)
  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5555)
  }, [successMessage])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDelete = (event, id, name) => {
    console.log(event.target.value)

    if (window.confirm(`Deleting ${name}. Are you sure?`)) {
      console.log("Deleted a person D:")
      personService
        .deletePerson(id)
        .then(() => { setPersons(persons.filter(person => person.id !== id)) })
    }
    else {
      console.log("Delete cancelled")
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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
        setSuccessMessage={setSuccessMessage}
      />
      <h3>Numbers </h3>
      <Persons
        namesToShow={namesToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}


export default App