const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = null
  for (let idx = 0; idx < blogs.length; idx++) {
    if (!favorite || favorite.likes < blogs[idx].likes) favorite = blogs[idx]
  }
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
