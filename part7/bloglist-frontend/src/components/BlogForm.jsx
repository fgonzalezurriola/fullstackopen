import { useCreateBlog } from '../hooks/useBlogs'

const BlogForm = () => {
  const createBlogMutation = useCreateBlog()

  const onCreate = async (event) => {
    event.preventDefault()
    const form = event.target
    const blog = {
      title: form.elements.blog.value,
      author: form.elements.author.value,
      url: form.elements.url.value,
    }
    form.elements.blog.value = ''
    form.elements.author.value = ''
    form.elements.url.value = ''
    createBlogMutation.mutate(blog)
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={onCreate}>
        Title: <input name="blog" data-testid="title-input" /> <br />
        Author: <input name="author" data-testid="author-input" /> <br />
        URL: <input name="url" data-testid="url-input" /> <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
