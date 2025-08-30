const Content = (props) => {
    const contents = props.content
    console.log(contents)
    return (
      contents.map((content,idx) => <p key={idx}> {content.part} {content.exercise} </p>)
    )
}

export default Content;
