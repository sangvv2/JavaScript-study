const API_KEY = `5ef9d02cad9949e1af0a1b501925f601`
let newList = []
const menus = document.querySelectorAll(".menus button")
const sideMenuButtons = document.querySelectorAll(".side-menu button")
menus.forEach(menu => menu.addEventListener("click",(event) =>getNewsByCategory(event)))
sideMenuButtons.forEach(item => item.addEventListener("click",(event) =>getNewsByCategory(event)))

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&apiKey=${API_KEY}`)
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5


const getNews = async() => {
  try{
    url.searchParams.set("page",page) // -> &page=page
    url.searchParams.set("pageSize",pageSize)

    const response = await fetch(url)

    const data = await response.json()
    if(response.status===200){
        if(data.articles.length === 0){
          throw new Error("No result for this search")
        }
      newList = data.articles
      totalResults = data.totalResults
      render()
      pagNationRender()
    }else{
      throw new Error(data.message)
    }
    
  }catch(error){
    errorRender(error.message)
  }
}


const getLatestNews = async() => {
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&apiKey=${API_KEY}`)
  getNews()
}


const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase().trim()

  // 🔥 유효한 카테고리만 API 요청 (잘못된 요청 방지)
  const validCategories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
  if (!validCategories.includes(category)) return;

  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&category=${category}&apiKey=${API_KEY}`)

  // ✅ getNews 함수 호출 (에러 처리 포함)
  getNews()
};



const getNewsByKeyword = async(event) => {
  let searchInput = document.getElementById("search-input");
  let keyword = document.getElementById("search-input").value
  

  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?page=1&pageSize=20&country=kr&q=${keyword}&apiKey=${API_KEY}`)
  getNews()

  searchInput.value = ""
}

const toggleSearch = () =>{
  const searchContainer = document.querySelector(".search-container")

  // 검색창이 보이는 상태면 숨기고, 아니면 표시
  if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
      searchContainer.style.display = "flex"
  } else {
      searchContainer.style.display = "none"
  }
}

const toggleMenu = () => {
  const sideMenu = document.querySelector(".side-menu")
  sideMenu.style.left = "0";
};

const toggleMenuX = () => {
  const sideMenu = document.querySelector(".side-menu")
  sideMenu.style.left = "-100%"

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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`
document.getElementById("news-board").innerHTML = errorHTML
}

const pagNationRender = () => {
  //totalResult
  //page
  //pageSize
  //groupSize
  //totalPages
  const totalPages = Math.ceil(totalResults/pageSize)
  //pageGroup
  const pageGroup = Math.ceil(page/groupSize)
  //lastPage
  const lastPage = pageGroup * groupSize
  //마지막 페이지그룹이 그룹사이즈보다 작다? lastPage = totalPage
  if(lastPage > totalPages){
    lastPage = totalPages
  }

  //firstPage
  const firstPage = lastPage - (groupSize - 1) <=0? 1 : lastPage - (groupSize - 1)

  let pagiNationHTML = ``

  for(let i =firstPage; i <=lastPage; i++){
    pagiNationHTML += `<li class="page-item ${i === page? "active": ""}" onclick = "moveToPage(${i})"><a class="page-link" >${i}</a></li>`
  }
  document.querySelector(".pagination").innerHTML = pagiNationHTML

  // <nav aria-label="Page navigation example">
  // <ul class="pagination">
  //   <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //   <li class="page-item"><a class="page-link" href="#">1</a></li>
  //   <li class="page-item"><a class="page-link" href="#">2</a></li>
  //   <li class="page-item"><a class="page-link" href="#">3</a></li>
  //   <li class="page-item"><a class="page-link" href="#">Next</a></li>
  // </ul>
  // </nav>
}

const moveToPage = (pageNum) => {
  console.log("movePage",pageNum)
  page = pageNum
  getNews()
}

getLatestNews()

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기