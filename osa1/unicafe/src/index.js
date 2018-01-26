import React from 'react'
import ReactDOM from 'react-dom'

const Palauteboxi = ({lisaaHyva, lisaaNeutraali, lisaaHuono}) => {
    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button handleClick={lisaaHyva} text="Hyvä" />
            <Button handleClick={lisaaNeutraali} text="Neutraali" />
            <Button handleClick={lisaaHuono} text="Huono" />
        </div>
    )
}

const Button = ({handleClick, text}) => <button onClick={handleClick()}>{text}</button>

const Statistic = ({label, value}) => <div>{label}: {value}</div>

const Statistics = ({hyva, neutraali, huono}) => {
    let yhteensa = hyva + neutraali + huono;
    let keskiarvo = (hyva - huono) / yhteensa;
    let positiivisia = hyva / yhteensa;

    if (yhteensa === 0) {
        keskiarvo = 0;
        positiivisia = 0;
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

    lisaaHyva = () =>  () => this.setState({ hyva: this.state.hyva + 1 })
    lisaaNeutraali = () => () => this.setState({ neutraali: this.state.neutraali + 1 })
    lisaaHuono = () => () => this.setState({ huono: this.state.huono + 1 })

    render() {
        const {hyva, neutraali, huono} = this.state;

        return (
            <div>
                <Palauteboxi lisaaHyva={this.lisaaHyva} lisaaNeutraali={this.lisaaNeutraali} lisaaHuono={this.lisaaHuono} />
                <Statistics hyva={hyva} neutraali={neutraali} huono={huono} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)