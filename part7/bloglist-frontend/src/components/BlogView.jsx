import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogView = ({ handleLike, handleDeleteBlog, user }) => {
  const { id } = useParams()
  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const isOwner = blog.user?.username === user?.username || blog.user === user?.id
  console.log('isOwner', isOwner, blog.user, user)

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user?.username || blog.user?.name}</div>
      {isOwner && <button onClick={() => handleDeleteBlog(blog.id)}>remove</button>}
    </div>
  )
}

export default BlogView
