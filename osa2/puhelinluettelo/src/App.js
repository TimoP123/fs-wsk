import React from 'react';
import personService from './services/persons'
import Henkilot from './Henkilot'
import Message from './Message'
import ErrorMessage from './ErrorMessage'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null,
      error: null
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
          newNumber: '',
          message: `${personObject.name} lisättiin puhelinluetteloon`
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 3000)
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
            persons: this.state.persons.map(person => person.id !== id ? person : changedPerson),
            message: `${changedPerson.name}n numero vaihdettiin.`,
            newName: '',
            newNumber: '',
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 3000)
        })
        .catch(error => {
          this.setState({
            newName: '',
            newNumber: '',
            error: `Henkilö '${changedPerson.name}' on jo valitettavasti poistettu palvelimelta`,
            persons: this.state.persons.filter(person => person.id !== changedPerson.id)
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 3000)
        }) 
      } else {
        this.setState({
          newName: '',
          newNumber: '',
          message: 'Puhelinnumeroa ei vaihdettu'
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 3000)
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
          persons: this.state.persons.filter(person => person.id !== henkilo.id),
          message: `${henkilo.name} poistettiin luettelosta.`
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 3000)
      }) :
      console.log("Poisto peruutettiin")
  }

  render() {
    const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Message message={this.state.message}/>
        <ErrorMessage message={this.state.error}/>
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