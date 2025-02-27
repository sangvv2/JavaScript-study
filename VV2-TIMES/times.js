const API_KEY = `5ef9d02cad9949e1af0a1b501925f601`
let newList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click",(event) =>getNewsByCategory(event)))

const getLatestNews = async() => {
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&apiKey=${API_KEY}`)
  const response = await fetch(url)
  const data = await response.json()
  newList = data.articles
  render()
  console.log("ddd",newList)
}

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase()
  console.log("category",category)
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&category=${category}&apiKey=${API_KEY}`)
  const response = await fetch(url)
  const data = await response.json()
  console.log("Data",data)
  newList = data.articles
  render()
}

const getNewsByKeyword = async(event) => {
  let keyword = document.getElementById("search-input").value
  console.log("keyword:", keyword)
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&q=${keyword}&apiKey=${API_KEY}`)
  const response = await fetch(url)
  const data = await response.json()
  console.log("keyword data",data)
  newList = data.articles
  render()
}

const toggleSearch = () =>{
  const searchContainer = document.querySelector(".search-container");

  // 검색창이 보이는 상태면 숨기고, 아니면 표시
  if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
      searchContainer.style.display = "flex";
  } else {
      searchContainer.style.display = "none";
  }
}


const render =() =>{

  const newsHTML = newList.map(news => `     
    <div class = "row news ">
      <div class = "col-lg-4 ">
        <img class="news-img-size" src="${news.urlToImage ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'}"
        // onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';" />

      </div>
      <div class = "col-lg-8 news-content">
        <h2>${news.title}</h2>
        <p>
          ${news.description 
            ? news.description.length > 200 
              ? news.description.substring(0, 200) + "..."
              : news.description 
            : "내용없음"}
        </p>
        <div>
          ${news.source.name || "no source"} *${moment(news.publishedAt).fromNow()}
        </div>
      </div>
    </div>` ).join('')
  
  
  document.getElementById('news-board').innerHTML = newsHTML
}

getLatestNews()

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기