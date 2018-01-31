import React from 'react';
import axios from 'axios';
import CountryList from './CountryList'
import Country from './Country'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  selectCountry = (name) => {
    return() => {
      this.setState({filter: name})
    }
  }

  render() {
    const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);

    let countries = null;
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      countries = <Country name={country.name} capital={country.capital}
            population={country.population} flag={country.flag} />
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      countries = <CountryList countries={filteredCountries} selectCountry={this.selectCountry} />
    } else {
      countries = <p>Too many matches! Specify your search.</p>
    }
    return (
      <div>
        <div>
          Search countries: <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        {countries}
      </div>
    )
  }


}

export default App;
