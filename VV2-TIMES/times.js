const API_KEY = `5ef9d02cad9949e1af0a1b501925f601`
let news = []
const getLatestNews = async() => {
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&apiKey=${API_KEY}`)
  const response = await fetch(url)
  const data = await response.json()
  news = data.articles
  console.log("ddd",news)
}
getLatestNews()