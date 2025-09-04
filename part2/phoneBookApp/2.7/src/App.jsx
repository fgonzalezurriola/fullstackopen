import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    const nameExists = persons.some(person => person.name === personObject.name)
    if (nameExists) {
      alert(`${personObject.name} is already added to phonebook`)
      setNewName('')
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}


export default App