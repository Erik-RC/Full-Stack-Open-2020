import React from 'react'

const Header = (props) =>{
  return(
    <h1>{props.course} </h1>
  )
}

const Part = (props) =>{
  return(
    <p>{props.name} {props.exercises} </p>
  )
}

const Course = ({course}) =>{
  const content = course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
  return(
    <div>
      <Header course={course.name} />
      <div>
        {content}
      </div>
    </div>
  )
}

export default Course