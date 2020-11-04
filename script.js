"use strict"
let todoList = [];

// (function() {
// 	$.ajax({
// 		// copy Your bin identifier here. It can be obtained in the dashboard
// 		url: 'https://api.jsonbin.io/b/5f8c66e5058d9a7b94dd4b18/latest',
// 		type: 'GET',
// 		headers: { //Required only if you are trying to access a private bin
// 			'secret-key': '$2b$10$sY3mVe7hpbhqgadCYri21uGGsgq/GMYRIDKQGi3Uh4Lcus0MDwjAi'
// 		},
// 		success: (data) => {
// 			//console.log(data);
// 			todoList = data;
// 			updateTodoList();
// 		},
// 		error: (err) => {
// 			console.log(err.responseJSON);
// 		}
// 	});
// })();

// let updateJSONbin = function() {
// 	$.ajax({
// 		url: 'https://api.jsonbin.io/b/5f8c66e5058d9a7b94dd4b18',
// 		type: 'PUT',
// 		headers: { //Required only if you are trying to access a private bin
// 			'secret-key': '$2b$10$sY3mVe7hpbhqgadCYri21uGGsgq/GMYRIDKQGi3Uh4Lcus0MDwjAi'
// 		},
// 		contentType: 'application/json',
// 		data: JSON.stringify(todoList),
// 		success: (data) => {
// 			console.log(data);
// 		},
// 		error: (err) => {
// 			console.log(err.responseJSON);
// 		}
// 	});
// };


let initList = function () {
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null) {
        todoList = JSON.parse(savedList);
    } else {
        todoList.push(
            {
                title: "Learn JS",
                description: "Create a demo application for my TODO's",
                place: "445",
                dueDate: new Date(2019, 9, 16)
            },
            {
                title: "Lecture test",
                description: "Quick test from the first three lectures",
                place: "F6",
                dueDate: new Date(2019, 9, 17)
            }
        );
    }
}
initList();

let updateTodoList = function () {
    let todoListDiv = document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }


    // //add all elements
    // for (let todo in todoList) {
    //     let newDeleteButton = document.createElement("input");
    //     newDeleteButton.type = "button";
    //     newDeleteButton.value = "x";
    //     newDeleteButton.addEventListener("click",
    //         function () {
    //             deleteTodo(todo);
    //         })

    //     let newElement = document.createElement("div");
    //     let newContent = document.createTextNode(
    //         todoList[todo].title + " " + todoList[todo].description);
    //     newElement.appendChild(newContent);
    //     newElement.appendChild(newDeleteButton);
    //     todoListDiv.appendChild(newElement);
    // }

    //add all elements
    let filterInput = (document.getElementById('inputSearch').value).toLowerCase();
    for (let todo in todoList) {
        if (
            checkDate(new Date(todoList[todo].dueDate)) &&
            ((filterInput.value == "") ||
            (todoList[todo].title.toLowerCase().includes(filterInput)) ||
            (todoList[todo].description.toLowerCase().includes(filterInput)))
        ) { 
            let newElement = document.createElement("p"); 
            let newContent = document.createTextNode((new Number(todo) + 1) + " " + todoList[todo].title + " " +
                todoList[todo].description);
            newElement.appendChild(newContent);
            todoListDiv.appendChild(newElement);
        }
    }
}

let deleteTodo = function (index) {
    todoList.splice(index, 1);
}

let checkDate = function (dateToCheck) {
    let startDate = new Date(document.getElementById("startDate").value);
    let endDate = new Date(document.getElementById("endDate").value);
    // if((!isNaN(startDate) || dateToCheck <= startDate)  && (!isNan(endDate) ||  dateToCheck >= endDate)) {
    //     return false;
    // }
    // else return true;

    if(!isNaN(startDate) && !isNaN(endDate)){
        if(dateToCheck >= startDate && dateToCheck <= endDate){
            return true;
        } else return false;
    } else return true;
}

let isEmpty = function(message) {
    return (!message || message.length === 0);
}

setInterval(updateTodoList, 1000);

let setMinDueDate = function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateOfTask")[0].setAttribute('min', today);
}
setMinDueDate();

let addTodo = function () {
    //get the elements in the form
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");
    //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = new Date(inputDate.value);

    if (isNaN(newDate) || newTitle == "" || newDescription == "" || newPlace == "") {
        alert('Fill in the blanks!');
        return;
    }
    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };


    //add item to the list
    todoList.push(newTodo);
    // updateJSONbin();
    updateTodoList();
    document.getElementById("myForm").reset();

    window.localStorage.setItem("todos", JSON.stringify(todoList));
}



// $(document).ready(function(){
//     $("#hide").click(function(){
//       $("search").hide();
//     });
//     $("#show").click(function(){
//       $("p").show();
//     });
//   });

var btnAddTask = document.getElementById('btnAddTask');
var btnSearchTask = document.getElementById('btnSearchTask');
var searchDiv = document.getElementById('search');
var addDiv = document.getElementById('add');

btnAddTask.onclick = function () {
    searchDiv.style.display = 'none';
    addDiv.style.display = 'block'
};

btnSearchTask.onclick = function () {
    searchDiv.style.display = 'block';
    addDiv.style.display = 'none';
}

