import React from 'react'
import ReactDOM from 'react-dom'

const Palauteboxi = ({annaPalaute}) => {
    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button handleClick={annaPalaute} palaute={1} text="Hyvä" />
            <Button handleClick={annaPalaute} palaute={0} text="Neutraali" />
            <Button handleClick={annaPalaute} palaute={-1} text="Huono" />
        </div>
    )
}

const Button = ({handleClick, palaute, text}) => <button onClick={handleClick({palaute})}>{text}</button>

const Statistic = ({label, value}) => <div>{label}: {value}</div>

const Statistics = ({hyva, neutraali, huono}) => {
    let yhteensa = hyva + neutraali + huono;
    let keskiarvo = (hyva - huono) / yhteensa;
    let positiivisia = hyva / yhteensa;

    if (yhteensa === 0) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu.</p>
            </div>          
        )
    }

    return (
        <div>
            <h1>Statistiikka</h1>
            <Statistic label="Hyvä" value={hyva} />
            <Statistic label="Neutraali" value={neutraali} />
            <Statistic label="Huono" value={huono} />
            <Statistic label="Keskiarvo" value={keskiarvo} />
            <Statistic label="Positiivisia" value={100 * positiivisia + " %"} />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    annaPalaute = (palaute) => {
        return() => {
                const arvio = palaute.palaute;
                console.log("Arvio:  ", arvio);
                switch (arvio) {
                    case 1:
                        this.setState({ hyva: this.state.hyva + 1 })
                        break;
                    case 0:
                        this.setState({ neutraali: this.state.neutraali + 1 })
                        break;
                    case -1:
                        this.setState({ huono: this.state.huono + 1 })
                        break;
                    default:
                        break;
                }
        }
    }

    render() {
        const {hyva, neutraali, huono} = this.state;

        return (
            <div>
                <Palauteboxi annaPalaute={this.annaPalaute} />
                <Statistics hyva={hyva} neutraali={neutraali} huono={huono} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)