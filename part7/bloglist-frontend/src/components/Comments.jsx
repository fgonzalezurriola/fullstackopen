const Comments = ({ blog }) => {
  if (!blog.comments || blog.comments.length === 0) {
    return (
      <div>
        <h3>comments</h3>
        <p>No comments yet</p>
      </div>
    )
  }

  return (
    <div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
