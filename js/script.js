let calMonth = document.querySelector('.calendar__month_list'),
    listMonth = calMonth.getElementsByTagName('li'),
    data = document.getElementById('data');
    // создаем переменные для взаимодействия со страницей

let servObj,
    servElem;
    // переменные для получения содержимого с сервера

// вызываем обработчик событий
calMonth.addEventListener('click', function (e) {

  let element = e.target.className,
      elemValue = e.target;    
  
  writeData(element, elemValue);

})

function writeData(element, elemValue) {

  if (elemValue.tagName == 'LI') {
    servElem = servObj[element].events.map(item => item);
    data.value = '';  
    for (let i = 0; i < servElem.length; i++) {
      data.value += `${servElem[i].date} `;
      data.value += `${servElem[i].event} \n`;    
    }   
  }
  
}

// функция запроса данных с сервера
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          console.log('responseText:' + xmlhttp.responseText);
          try {
              var data = JSON.parse(xmlhttp.responseText);
          } catch(err) {
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
ajax_get('../data.json', function(data) {  
  servObj = data;
});




