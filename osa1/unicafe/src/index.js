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
    return (
        <div>
            <h1>Statistiikka</h1>
            <div>hyvä: {props.hyva}</div>
            <div>neutraali: {props.neutraali}</div>
            <div>huono: {props.huono}</div>
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

    render() {
        const {hyva, neutraali, huono} = this.state;

        const lisaaHyva = () => {
            return () => {
                this.setState({ hyva: this.state.hyva + 1 })
            }
        }

        const lisaaNeutraali = () => {
            return () => {
                this.setState({ neutraali: this.state.neutraali + 1 })
            }
        }

        const lisaaHuono = () => {
            return () => {
                this.setState({ huono: this.state.huono + 1 })
            }
        }

        return (
            <div>
                <Palauteboxi lisaaHyva={lisaaHyva.bind(this)} lisaaNeutraali={lisaaNeutraali.bind(this)} lisaaHuono={lisaaHuono.bind(this)} />
                <Statistiikka hyva={hyva} neutraali={neutraali} huono={huono} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)