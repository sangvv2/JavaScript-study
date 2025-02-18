//유저가 값을 입력한다.
//+버튼을 클릭하면, 할일이 추가된다.
//delete버튼을 클릭하면, 할일이 삭제 된다.
//check버튼을 클릭하면, 할일이 끝나면서 밑줄이 간다.
//진행중  탭을 누르면, 언더바가 이동한다.
//완료탭은, 완료 일정만/ 진행 중은 진행중인 일정만 표시된다.
//전체일정을 누르면 다시 전체아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click",addTask)

function addTask(){
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render(){
  let resultHTML = ``;
  for(let i = 0; i<taskList.length; i++){
    resultHTML += `<div class = "task">
          <div>${taskList[i]}</div>
          <div>
            <button type="button" class="btn btn-primary">check</button>
            <button type="button" class="btn btn-info">Delete</button>
          </div>
        </div>`
  }
  document.getElementById("task-board").innerHTML = resultHTML
}