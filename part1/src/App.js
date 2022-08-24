import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '' || newNumber === '') {
      return alert('Both fields cannot be empty');
    }
    if (persons.find((person) => person.name === newName) || persons.find((person) => person.number === newNumber)) {
      return alert(`Same value is already added to phonebook`);
    }
    const newPerson = {name: newName, number: newNumber};
    setPersons(persons.concat(newPerson));
    setFilteredPersons(persons.concat(newPerson));
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    console.log('Changed')
    setSearchName(event.target.value)
    const filtered = persons.filter((person) => person.name.toLowerCase().startsWith(event.target.value))
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleChange={handleSearchName}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} nameChange={handleNameChange} numChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
      
    </div>
  )
}

const Filter = (props) => {
  return (
    <>
      filter shown with <input value={props.searchName} onChange={props.handleChange}/>
    </>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.nameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.numChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    props.filteredPersons.map((person) => <p key={person.id}>{person.name} {person.number}</p>)
  )
}

export default App