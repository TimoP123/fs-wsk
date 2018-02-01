import React from 'react';

const Henkilot = ({henkilot, remove}) => {
    return (
        <div>
            <table><tbody>
                {henkilot.map(henkilo =>
                <tr key={henkilo.id}>
                    <td>{henkilo.name}</td><td>{henkilo.number}</td>
                    <td><button key={henkilo.id} onClick={ () => {remove(henkilo)}}>Poista</button></td>
                </tr>)}
            </tbody></table>
        </div>
    )
}

export default Henkilot