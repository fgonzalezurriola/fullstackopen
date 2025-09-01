
const Header = ({ course }) => {
  console.log("Header props ", course)
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part, exercise }) => {
  console.log("Part props ", { part }, { exercise })
  return (
    <>
      <p>{part} {exercise}</p>
    </>
  )
}

const Content = ({ contents }) => {
  console.log("Content props ", { contents })
  return (
    <>
      <Part part={contents[0].name} exercise={contents[0].exercises} />
      <Part part={contents[1].name} exercise={contents[1].exercises} />
      <Part part={contents[2].name} exercise={contents[2].exercises} />
    </>
  )
}


const Total = ({ contents }) => {
  console.log("Total props ", { contents })
  const exercises = contents.map((content) => {
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const contents = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total contents={contents} />
    </div>
  )
}

export default App