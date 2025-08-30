const Total = (props) => {
    const exercises = props.exercises
    const totalExercises = exercises.reduce((sum, exercise) => sum + exercise, 0);
    return ( 
        <>
          <p>Number of exercises {totalExercises} </p>
        </>
    )
}

export default Total