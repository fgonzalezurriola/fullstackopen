const Part = (props) => {
    const part = props.part
    const exercise = props.exercise
    return (
        <>
          <p>{part} {exercise}</p>
        </>
    )
}

const Content = (props) => {
    return (
      <>
        <Part part={props.contents[0].part} exercise={props.contents[0].exercise} />
        <Part part={props.contents[1].part} exercise={props.contents[1].exercise} />
        <Part part={props.contents[2].part} exercise={props.contents[2].exercise} />
      </>
    )
}

const Header = (props) => {
    console.log(props) 
    return (
          <h1>{props.course}</h1>
      )
}

const Total = (props) => {
    const exercises = props.exercises
    const totalExercises = exercises.reduce((sum, exercise) => sum + exercise, 0);
    return ( 
        <>
          <p>Number of exercises {totalExercises} </p>
        </>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  const exercises = [exercises1, exercises2, exercises3]
  const contents = [
    {part: part1, exercise: exercises1},
    {part: part2, exercise: exercises2},
    {part: part3, exercise: exercises3}
  ]

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App