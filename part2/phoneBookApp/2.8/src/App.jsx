import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: "9348" }])
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit" >add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}


export default App