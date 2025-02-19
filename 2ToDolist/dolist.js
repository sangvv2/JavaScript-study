//유저가 값을 입력한다.
//+버튼을 클릭하면, 할일이 추가된다.
//delete버튼을 클릭하면, 할일이 삭제 된다.
//check버튼을 클릭하면, 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 false -> true
//2.true 이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안 끝난걸로 간주하고 그대로

//진행중  탭을 누르면, 언더바가 이동한다.
//완료탭은, 완료 일정만/ 진행 중은 진행중인 일정만 표시된다.
//전체일정을 누르면 다시 전체아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs =document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line")
let taskList = [];
let filterList =[];
let mode='all';

addButton.addEventListener("click",addTask);
tabs.forEach(menu => menu.addEventListener("click",(event) => move(event)));

for(let i = 1; i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){move(event)});
}
console.log(tabs)

taskInput.addEventListener("focus", function () {
  this.value = ""; // 클릭하면 기존 입력값 삭제
});

function addTask(){
  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task);
  console.log(taskList);
  render();
}

function render(){
  let resultHTML = "";
  //1. 내가 선택한 탭에 따라서
  let list = []
  if(mode === "all"){
    list = [...taskList].sort((a, b) => a.isComplete - b.isComplete);
  }else if(mode === "ongoing" || mode === "done"){
    list = filterList;
  }


  for(let i = 0; i<list.length; i++){
    if(list[i].isComplete == true){
      resultHTML+= `<div class = "task task-done">
          <div class ="task-done">${list[i].taskContent}</div>
          <div class = "button-box">
            <button onclick="toggleComplete('${list[i].id}')" type="button" class="btn btn-outline-secondary"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick = "deleteTask('${list[i].id}')" type="button" class="btn btn-info">Delete</button>
          </div>
        </div>`;
    }else{
      resultHTML += `<div class = "task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')" type="button" class="btn btn-primary"><i class="fa-solid fa-check-to-slot"></i></button>
            <button onclick = "deleteTask('${list[i].id}')" type="button" class="btn btn-info">Delete</button>
          </div>
        </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
  for(let i = 0; i<taskList.length; i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}


function deleteTask(id){
  taskList = taskList.filter(task => task.id !== id);
  //filter()은 주어진 조건을 만족하는 요소만 남겨서 새로운 배열을 생성합니다.
  //즉,  조건을 만족하지 않는 요소는 결과 배열에서 제외됨

  if (mode === "ongoing") {
    filterList = taskList.filter(task => !task.isComplete); // 진행 중인 목록 업데이트(각 탭에서도 바로 삭제 가능한 코드)
  } else if (mode === "done") {
    filterList = taskList.filter(task => task.isComplete); // 완료된 목록 업데이트
  }
  render();

  
  /*splice이용하는 방법
  for(let i = 0; i<taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
    render();
  }
  */ 
}

function move(event){
  if(event){
    mode = event.target.id;
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px" ;
    render();
  }// 마지막 줄 코드: 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event


  mode = event.target.id;
  filterList =[];
  if(mode ==="all"){
    render();
  }else if(mode === "ongoing"){
    //task.isComplete = false
    for(let i = 0; i<taskList.length; i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i]);
      }
    }
    render();
  }else if(mode === "done"){
    for(let i = 0; i<taskList.length; i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i]);
      }
    }
  render();
  }
}


function randomIDGenerate(){
  return '_' + Math.random().toString(36).slice(2, 16);
}