import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import useNotification from './useNotification'

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    },
    onError: (error) => {
      setNotification(error.response?.data?.error || error.message)
    },
  })
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (returnedBlog, { id, blog }) => {
      const blogToUpdate = {
        ...returnedBlog,
        user: returnedBlog.user || blog.user,
      }
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((b) => (b.id !== id ? b : blogToUpdate)),
      )
    },
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => oldBlogs.filter((b) => b.id !== id))
    },
    onError: (error) => {
      setNotification(`Error: ${error.response?.data?.error || error.message}`)
    },
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ blogId, comment }) => blogService.commentBlog(blogId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}
