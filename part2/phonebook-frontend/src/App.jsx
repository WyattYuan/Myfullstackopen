import { useEffect, useState } from 'react'
import personsService from './service/persons'
import Notification from './components/Notification'

const PersonList = ({ persons, setPersons, setMessage, setMessageType }) => {
  return (
    <>
      {persons.map(
        (person) =>
          <p key={person.name}>
            {person.name} {person.number} <button onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)) {
                personsService
                  .deletePerson(persons.find(x => x.name === person.name).id)
                  .then(() => setPersons(persons.filter(x => x.name !== person.name)))
                  .catch((error) => {
                    setMessageType('error')
                    setMessage(`Information of ${person.name} has been removed`)
                    setTimeout(() => {
                      setMessage(null)
                    }, 5000)
                  })
              }
            }}>delete</button>
          </p>)}
    </>)
}


const Filter = ({
  nameToSearch,
  setNameToSearch
}) => {
  return (
    <div>
      filter shown with

      <input value={nameToSearch} onChange={(event) => setNameToSearch(event.target.value)} />

    </div>
  )
}

const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={(event) => onNameChange(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => onNumberChange(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToSearch, setNameToSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(
    () => {
      personsService.getAll().then(persons => setPersons(persons))
    }
    , [])

  const personsToShow = nameToSearch === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(nameToSearch.toLowerCase()))


  const handleAddPerson = (event) => {
    event.preventDefault()
    const exists = persons.some(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (exists) {
      if (window.confirm(`${newName} is already add to the phonebook, replace the old number with the new one?`)) {
        const targetID = persons.find(person => person.name === newName).id
        personsService
          .update(targetID, personObject)
        const updated = persons.map(p => p.id === targetID ? personObject : p)
        setPersons(updated)
      }
      return
    }
    personsService.create(personObject).then(newPerson => setPersons(persons.concat(newPerson)))
    setMessage(`Added ${newName}`)
    setMessageType('error')
    setNewName('')
    setNewNumber('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}></Notification>
      <Filter nameToSearch={nameToSearch} setNameToSearch={setNameToSearch}></Filter>
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={setNewName} newNumber={newNumber} onNumberChange={setNewNumber} onSubmit={handleAddPerson}></PersonForm>
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType}> </PersonList>
    </div>
  )
}

export default App