import React from 'react'
import Kurssi from './Kurssi'


const Kurssit = ({kurssit}) => {
    return (
        <div>
            {kurssit.map(kurssi => <Kurssi kurssi={kurssi} />)}
        </div>
    )
}

export default Kurssit