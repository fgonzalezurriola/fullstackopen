# PhoneBookApp

Exercises 2.6 to 2.10

const App = () => {
const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
const [newName, setNewName] = useState('')

const addPerson = (event) => {
event.preventDefault()
const personObject = {
name: newName
}
if (persons.includes(personObject.name)) {
alert(`${personObject.name} is already added to phonebook`)
setNewName('')
}
else {
setPersons(persons.concat(personObject))
setNewName('')
}
}
