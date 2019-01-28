'use strict';

// создаем переменные для взаимодействия со страницей
var calMonth = document.querySelector('.calendar__month_list'),
    calData = document.querySelector('.calendar__data'),
    listMonth = document.querySelectorAll('.calendar__month_list-elem'),
    data = document.getElementById('data');

// переменные для получения содержимого с сервера
var servObj = void 0,
    servElem = void 0;

// вызываем обработчик событий
calMonth.addEventListener('click', function (e) {

  var elemValue = e.target;

  // проверка номера элемента в массиве на который нажали
  for (var i = 0; i < listMonth.length; i++) {
    if (listMonth[i] === elemValue) {
      writeData(i);
    }
  }
});

function writeData(element) {

  servElem = servObj[element].events.map(function (item) {
    return item;
  });
  var mass = '';
  for (var i = 0; i < servElem.length; i++) {
    mass = mass + ' ' + servElem[i].date + ' ' + servElem[i].event + ' <br>';
    calData.innerHTML = mass;
  }
}

// функция запроса данных с сервера
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// получение данных и перекладка в переменную
ajax_get('../data.json', function (data) {
  servObj = data;
});