import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // 2.9 Here
  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const [newFilter, setNewFilter] = useState('')
  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      Filter: <input value={newFilter} onChange={handleNewFilter} />
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit" >add</button></div>
      </form>
      <h2>Numbers</h2>
      {namesToShow.map((person) => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}


export default App