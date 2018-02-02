import React from 'react';
import personService from './services/persons'
import Henkilot from './Henkilot'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({persons: response})
      })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (this.state.persons.find(person => person.name === this.state.newName) == null) {
      personService
      .create(personObject)
      .then(response => {
        console.log(response)
        personObject.id = response.id;
        this.setState({
          persons: this.state.persons.concat(response),
          newName: '',
          newNumber: ''
        })
      })
      
    } else {
      if(window.confirm(`${this.state.newName} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
        const oldPerson = this.state.persons.find(person => person.name === this.state.newName)
        const changedPerson = {...oldPerson, number: this.state.newNumber}

        personService
        .update(oldPerson.id, changedPerson)
        .then(response => {
          console.log(response)
          const id = changedPerson.id
          this.setState({
            persons: this.state.persons.map(person => person.id !== id ? person : changedPerson)
          })
        }) 
      } else {
        console.log("Puhelinnumeroa ei vaihdettu")
        this.setState({
          newName: '',
          newNumber: ''
        })
      }
    }
  }

  removePerson = (henkilo) => {
    window.confirm(`Poistetaanko ${henkilo.name} luettelosta?`) ?
      personService
      .remove(henkilo.id)
      .then(response => {
        console.log(response)
        this.setState({
          persons: this.state.persons.filter(person => person.id !== henkilo.id)
        })
      }) :
      console.log("Poisto peruutettiin")
  }

  render() {
    const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          Rajaa nimiä: <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <h3>Lisää uusi henkilö</h3>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h3>Numerot</h3>
        <Henkilot henkilot={filteredPersons} remove={this.removePerson} />
      </div>
    )
  }
}

export default App