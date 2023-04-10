import { useState } from 'react'

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.name} onChange={props.handleFilter}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addNewName}>
      <div>
        name: <input value={props.name} onChange={props.handleName} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return(
    <div>
      {props.persons.filter(nimi => nimi.name.toLowerCase().includes(props.filterName.toLowerCase())).map(filteredName =>
      <p key={filteredName.name}>{filteredName.name} {filteredName.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleAddingName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddingNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const addName = (event) => {
    console.log('event', event)
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log('newName', newName)

    const usedName = persons.some(nimi => nimi.name === newName)

    console.log('usedName', usedName)

    if (usedName) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
    
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filterName} handleFilter={handleFilterName}/>
      <h2>Add new name</h2>
      <PersonForm addNewName={addName} name={newName} handleName={handleAddingName} number={newNumber} handleNumber={handleAddingNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName}/>
    </div>
  )

}

export default App
