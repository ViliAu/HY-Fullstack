const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a, c) => a + c.likes, 0);
}

const favoriteBlog = (blogs) => {
    let bestBlog = {likes: -1}
    blogs.forEach(b => bestBlog = b.likes > bestBlog.likes ? b : bestBlog);
    return bestBlog;
}

const mostBlogs = (blogs) => {
    const authors = {}
    blogs.forEach(b => authors[b.author] = authors[b.author] ? authors[b.author] + 1 : 1);
    let mostBlogs = {blogs: -1}
    Object.entries(authors).forEach(([k, v]) => mostBlogs = v > mostBlogs.blogs ? {author: k, blogs: v} : mostBlogs);
    return mostBlogs;
}

const mostLikes = (blogs) => {
    const authors = {}
    blogs.forEach(b => authors[b.author] = authors[b.author] ? authors[b.author] + b.likes : b.likes);
    let mostLikes = {likes: -1}
    Object.entries(authors).forEach(([k, v]) => mostLikes = v > mostLikes.likes ? {author: k, likes: v} : mostLikes);
    return mostLikes;
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}