import React from 'react';

const Henkilot = ({henkilot}) => {
    return (
        <div>
            <table><tbody>
                {henkilot.map(henkilo =>
                <tr key={henkilo.id}>
                    <td>{henkilo.name}</td><td>{henkilo.number}</td>
                </tr>)}
            </tbody></table>
        </div>
    )
}

export default Henkilot