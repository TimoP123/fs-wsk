import React from 'react'
import ReactDOM from 'react-dom'

const Palauteboxi = props => {
    return (
        <div>
            <h1>Anna palautetta</h1>
            <button onClick={props.lisaaHyva()}>Hyvä</button>
            <button onClick={props.lisaaNeutraali()}>Neutraali</button>
            <button onClick={props.lisaaHuono()}>Huono</button>
        </div>
    )
}

const Statistiikka = props => {
    const { hyva, neutraali, huono } = props;
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
            <div>hyvä: {hyva}</div>
            <div>neutraali: {neutraali}</div>
            <div>huono: {huono}</div>
            <div>keskiarvo: {keskiarvo}</div>
            <div>positiivisia: {100 * positiivisia} %</div>
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

    lisaaHyva = () => {
        return () => {
            this.setState({ hyva: this.state.hyva + 1 })
        }
    }

    lisaaNeutraali = () => {
        return () => {
            this.setState({ neutraali: this.state.neutraali + 1 })
        }
    }

    lisaaHuono = () => {
        return () => {
            this.setState({ huono: this.state.huono + 1 })
        }
    }

    render() {
        const {hyva, neutraali, huono} = this.state;

        return (
            <div>
                <Palauteboxi lisaaHyva={this.lisaaHyva} lisaaNeutraali={this.lisaaNeutraali} lisaaHuono={this.lisaaHuono} />
                <Statistiikka hyva={hyva} neutraali={neutraali} huono={huono} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)