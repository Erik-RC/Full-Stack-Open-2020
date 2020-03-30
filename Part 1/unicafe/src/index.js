import React, {useState} from 'react';
import ReactDOM from 'react-dom';

//helper components
const Button = ({text, eventHandler}) =>{
  return(
    <button onClick={eventHandler}>
    {text}
    </button>
  )
}

const Statistics = (props) =>{
  const all = props.goodCount + props.neutralCount + props.badCount
  const avg = (props.goodCount - props.badCount)/all
  const positive = 100*(props.goodCount/all)

  if(all === 0){
    return(
      <table>
        <tbody>
          <tr>
            <td> No feedback given </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return(
    <table>
      <tbody>
        <Statistic statLabel="Good" statNum={props.goodCount} />
        <Statistic statLabel="Neutral" statNum={props.neutralCount} />
        <Statistic statLabel="Bad" statNum={props.badCount} />
        <Statistic statLabel="All" statNum={all} />
        <Statistic statLabel="Average" statNum={avg} />
        <Statistic statLabel="Positive" statNum={positive + "%"} />
      </tbody>
    </table>
  )
}

const Statistic = (props) =>{
  return(
    <tr>
      <td>{props.statLabel}</td>
      <td>{props.statNum} </td>
    </tr>
  )
}

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //event handlers for buttons
  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral +1)
  const addBad = () => setBad(bad+1)

  return(
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" eventHandler={addGood} />
      <Button text="Neutral" eventHandler={addNeutral} />
      <Button text="Bad" eventHandler={addBad} />
      <h1> Statistics </h1>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />  
    </div>

  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

