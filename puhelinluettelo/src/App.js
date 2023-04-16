import { useState, useEffect } from 'react'
import personsService from './services/persons'

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
      {props.persons.filter(nimi => nimi.name?.toLowerCase().includes(props.filterName?.toLowerCase())).map((filteredName, index) =>
      <div key={filteredName.name}>
        <p>{filteredName.name} {filteredName.number}</p>
        <button onClick={() => props.handleClick(filteredName.id)}>Delete</button> 
      </div>)}
    </div>
  )
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.class}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [classOfMessege, setClassOfMessege] = useState('success')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
      const allPersons = [...persons]
      const updateName = allPersons.find(nimi => nimi.name === newName)
      const updateNameIndex = allPersons.findIndex(nimi => nimi.id === updateName.id)
      updateName.number = newNumber
      if (window.confirm('Name is already added to phonebook, replace the old number with new one?')) {
        personsService
        .update(updateName.id, updateName)
        .then(response => {
          console.log('updated number', response.data)
          allPersons[updateNameIndex] = response.data
          setErrorMessage(
            `Updated '${response.data.name}'`
          )
          setClassOfMessege('success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(allPersons)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${updateName.name}' has already been removed from server`
          )
          setClassOfMessege('error')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personsService
      .create(nameObject)
      .then(response => {
        console.log('newName to json', response.data)
        setErrorMessage(
          `Added '${newName}'`
        )
        setClassOfMessege('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDelete = (id) => {
    console.log('id on:', id)
    const filteredNames = persons.filter(nimi => nimi.id !== id)
    if (window.confirm('Do you really want to delete the name?')) {
      personsService
      .deleteName(id)
      .then(response => {
        console.log('deleted name', response.data)
        setErrorMessage(
          `Deleted the name`
        )
        setClassOfMessege('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(filteredNames)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} class={classOfMessege}/>
      <Filter name={filterName} handleFilter={handleFilterName}/>
      <h2>Add new name</h2>
      <PersonForm addNewName={addName} name={newName} handleName={handleAddingName} number={newNumber} handleNumber={handleAddingNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} handleClick={handleDelete}/>
    </div>
  )

}

export default App
