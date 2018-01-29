import React from 'react'

const Yhteensa = ({osat}) => {
    const reducer = (accumulator, osa) => accumulator + osa.tehtavia;
    const lkm = osat.reduce(reducer, 0);

    return (
        <div>
            Yhteensä {lkm} tehtävää.
      </div>
    )
}

export default Yhteensa
