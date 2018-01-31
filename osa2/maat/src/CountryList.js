import React from 'react';

const CountryList = ({countries, selectCountry}) => {
    return (
        <div>
            {countries.map(country => 
                <div key={country.alpha2Code} onClick={selectCountry(country.name)}>{country.name}</div>
            )}
        </div>
    )
}

export default CountryList