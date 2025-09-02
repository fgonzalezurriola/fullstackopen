const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => (
    <div>
        {parts.map((part, idx) => (
            <Part key={idx} part={part} />
        ))}
    </div>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Course = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
            {
                name: 'random',
                exercises: 1
            },
        ],
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const App = () => {
    return (
        <Course />
    )
}

export default App
