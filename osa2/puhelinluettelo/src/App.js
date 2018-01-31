import React from 'react';
import axios from 'axios';
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
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

    if (this.state.persons.find(person => person.name === this.state.newName) == null) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      const persons = this.state.persons.concat(personObject)
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    } else {
      alert("Henkilö, jota yrität lisätä on jo luettelossa!")
    }   
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
        <Henkilot henkilot={filteredPersons} />
      </div>
    )
  }
}

export default App