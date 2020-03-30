import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text,handler}) =>{
  return(
    <button onClick={handler}>
      {text}
    </button>
  )
}

const Anecdote = ({text,votes}) =>{
  return(
    <div>
      <p>
        {text}
      </p>
      <p>
        Has {votes} votes
      </p>
    </div>
  )
}


const App = (props) =>{
  const [selected,setSelected] = useState(0)
  const copies = [...props.votes]
  const [copyOfvotes,setVotes] = useState(copies)
  const [currentVote, setCurrentVote] = useState(copyOfvotes[0])

  //sets and gets the index of the most popular anecdote
  const [popular, setPopular] = useState(0)

  const getAnecdote = () =>{
    let index = Math.floor(Math.random()*10);
    if(index > 5){
      index = 10%index
    }
    setSelected(index)
    setCurrentVote(copyOfvotes[index])
  }

  const upVote = () =>{
    copyOfvotes[selected] += 1
    setVotes(copyOfvotes)
    //console.log(copyOfvotes)
    setCurrentVote(copyOfvotes[selected])
    setMostPopular()
  }

  const setMostPopular = () =>{
    //first find the most popular index
    let pop = Math.max(...copyOfvotes)
    let indexOfPop = copyOfvotes.indexOf(pop)

    //only update if most popular has changed
    if(indexOfPop != popular){
      setPopular(indexOfPop)
    }
  }

  return(
    <div>
      <h1> Anecdote of the day </h1>
      <Anecdote text ={props.anecdotes[selected]} votes={currentVote} />
      <Button text={"Vote"} handler={upVote} />
      <Button text={"Next anecdote"} handler={getAnecdote} />

      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[popular]} votes={copyOfvotes[popular]} />

    </div>
  )
}

const votes = [0,0,0,0,0,0]
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} votes={votes}/>
  </React.StrictMode>,
  document.getElementById('root')
);


