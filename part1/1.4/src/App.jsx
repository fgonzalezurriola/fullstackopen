
const Header = ({course}) => {
    console.log("Header props ", course) 
    return (
          <h1>{course}</h1>
      )
}

const Part = ({name, exercise}) => {
    console.log("Part props ", {name}, {exercise})
    return (
        <>
          <p>{name} {exercise}</p>
        </>
    )
}

const Content = ({parts}) => {
    console.log("Content props ", {parts})
    return (
      <>
        <Part name={parts[0].name} exercise={parts[0].exercises} />
        <Part name={parts[1].name} exercise={parts[1].exercises} />
        <Part name={parts[2].name} exercise={parts[2].exercises} />
      </>
    )
}

// Oops, I have been using loops (map, reduce) since the beginning
const Total = ({parts}) => {
    console.log("Total props ", {parts})
    const exercises = parts.map((content) => {
      return content.exercises
    })
    const totalExercises = exercises.reduce((sum, exercise) => sum + exercise, 0);
    return ( 
        <>
          <p>Number of exercises {totalExercises} </p>
        </>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ] 
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App