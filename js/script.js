"use strict"
let todoList = [];
$(function () {
    $.ajax({
        //copy Your bin identifier here. It can be obtained in the dashboard
        url: 'https://api.jsonbin.io/b/5fa300c447077d298f5d09e7/latest',
        type: 'GET',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': '$2b$10$2uuqP9QRHRxSPKdqOt0QjemZsAh1Q/ZvJqyJXVTVsp3jUum9PY.9K'
        },
        success: (data) => {
            //   console.log(data);
            todoList = data;
        },
        error: (err) => {
            console.log(err.responseJSON);
            alert(err.responseJSON.message);
        }
    });
});

let updateJSONbin = function () {
    $.ajax({
        url: 'https://api.jsonbin.io/b/5fa300c447077d298f5d09e7',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': '$2b$10$2uuqP9QRHRxSPKdqOt0QjemZsAh1Q/ZvJqyJXVTVsp3jUum9PY.9K'
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

let updateTodoList = function () {
    let todoTable = $("#todoTableContent").find("tbody");

    //remove all elements from table
    todoTable.empty();

    //add all elements
    let filterInput = $("#inputSearch").val().toLowerCase();
    for (let todo in todoList) {
        if (
            checkDate(new Date(todoList[todo].dueDate)) &&
            ((filterInput.value == "") ||
                (todoList[todo].title.toLowerCase().includes(filterInput)) ||
                (todoList[todo].description.toLowerCase().includes(filterInput)))
        ) {
            todoTable.append(
                "<tr>" +
                "<th scope='row'>" + (new Number(todo) + 1) + "</td>" +
                "<td>" + todoList[todo].title + "</td>" +
                "<td>" + todoList[todo].description + "</td>" +
                "<td>" + todoList[todo].place + "</td>" +
                "<td>" + todoList[todo].dueDate.split('T')[0] + "</td>" +
                "<td class='text-center'>" + "<input class='btn btn-dark btn-sm' type='button' value='X' " +
                "onclick='deleteTodo(" + todo + ") '/> </td>" + "</tr>"
            );
        }
    }
}

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
    updateTodoList();
}

let checkDate = function (dateToCheck) {
    let startDate = new Date($("#startDate").val());
    let endDate = new Date($("#endDate").val());

    if (!isNaN(startDate) && !isNaN(endDate)) {
        if (dateToCheck >= startDate && dateToCheck <= endDate) {
            return true;
        } else return false;
    } else return true;
    
}

setInterval(updateTodoList,1000);

let setMinDueDate = function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateOfTask")[0].setAttribute('min', today);
}
setMinDueDate();

let addTodo = function () {
    //get the elements in the form
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputPlace = $("#inputPlace");
    let inputDate = $("#inputDate");
    //get the values from the form
    let newTitle = inputTitle.val();
    let newDescription = inputDescription.val();
    let newPlace = inputPlace.val();
    let newDate = new Date(inputDate.val());

    if (isNaN(newDate) || newTitle == "" || newDescription == "" || newPlace == "") {
        alert('Fill in the blanks!');
        return;
    }
    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate.toJSON()
    };

    //add item to the list
    todoList.push(newTodo);
    updateJSONbin();
    updateTodoList();

    $('#form').trigger("reset");

    $('html, body').animate({
        scrollTop: $("#taskSection").offset().top
    }, 2000);
}

let btnAddTask = $('#btnAddTask');
let btnSearchTask = $('#btnSearchTask');
let btnResetSearch = $('#btnResetSearch');
let searchDiv = $('#search');
let searchForm = $('#searchForm');
let addDiv = $('#add');

$(btnAddTask).click(function () {
    searchDiv.css({ 'display': 'none' });
    addDiv.css({ 'display': 'block' });
    btnSearchTask.removeClass("active");
    btnAddTask.addClass("active");
});

$(btnSearchTask).click(function () {
    searchDiv.css({ 'display': 'block' });
    addDiv.css({ 'display': 'none' });
    btnAddTask.removeClass("active");
    btnSearchTask.addClass("active");
})