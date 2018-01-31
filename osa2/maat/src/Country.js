import React from 'react';

const Country = ({name, capital, population, flag}) => {
    const imgStyle = {
        width: '50%',
        height: 'auto'
    };

    return (
        <div>
            <h1>{name}</h1>
            <div>Capital: {capital}</div>
            <div>Population: {population}</div>
            <img src={flag} alt={name} style={imgStyle} />
        </div>
    )
}

export default Country