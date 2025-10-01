import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    console.log('new blog added', newBlog)
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        Title:
        <input name="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="title here" />
        <br />
        <label>
          Author:
          <input
            name="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author here"
          />
        </label>
        <br />
        <label>
          URL:
          <input name="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="url here" />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
