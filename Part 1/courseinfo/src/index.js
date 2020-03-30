import React from 'react';
import ReactDOM from 'react-dom';

const App = () =>{
  const course = {
    name: "Half Stack applications development",
    parts: [
        {
          name: "Fundamentals of React",
          exercises: 10
        },

        {
          name: "Using props to pass data",
          exercises: 2
        },
        
        {
          name: "State of a component",
          exercises: 14
        } 
      ]
  } 
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <TotalExercises parts={course.parts}/>
    </div>
  )
}

const Header = (props) =>{
  return(
    <h1>{props.course} </h1>
  )
}

const Content = (props) =>{
  const p = props.parts;
  return(
    <div>
      <Part name={p[0].name} exercises={p[0].exercises} />
      <Part name={p[1].name} exercises={p[1].exercises} />
      <Part name={p[2].name} exercises={p[2].exercises} />
    </div>
  )
}

const Part = (props) =>{
  return(
    <p>{props.name} {props.exercises} </p>
  )
}

const TotalExercises = (props) =>{
  const sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return(
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))