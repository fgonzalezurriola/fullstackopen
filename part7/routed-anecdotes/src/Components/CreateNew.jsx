import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const CreateNew = (props) => {
  const content = useField()
  const author = useField()
  const info = useField()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = () => {
    content.onChange({ target: { value: '' } })
    author.onChange({ target: { value: '' } })
    info.onChange({ target: { value: '' } })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
