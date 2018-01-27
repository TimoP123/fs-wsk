import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <span><button onClick={handleClick()}>{text}</button></span>

const Votes = ({votes}) => <div>This anecdote has {votes} votes.</div>

const MostVotes = ({votes, anecdotes}) => {
    let indexOfMostVoted = 0;
    let mostVotes = 0;
    votes.forEach((amount, i) => {
        if (mostVotes < amount) {
            mostVotes = amount;
            indexOfMostVoted = i;
        }
    })
    return (
        <div>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[indexOfMostVoted]}</p>
            <p>This anecdote has {votes[indexOfMostVoted]} votes</p>
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    const votes = Array(props.anecdotes.length).fill(0);
    this.state = {
      selected: 0,
      votes: votes
    }
  }

  selectRandomAnecdote = () => {
      return() => {
        const next = Math.floor(Math.random() * this.props.anecdotes.length);
        this.setState({ selected: next });
      }
  }

  voteAnecdote = () => {
      let votes = [...this.state.votes];
      votes[this.state.selected] = votes[this.state.selected] + 1;
      return() => {
          this.setState({ votes: votes })
      }
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <Votes votes={this.state.votes[this.state.selected]} />
        <div>
            <Button handleClick={this.voteAnecdote} text="vote" />
            <Button handleClick={this.selectRandomAnecdote} text="Next anecdote" />
        </div>
        <MostVotes votes={this.state.votes} anecdotes={this.props.anecdotes} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)