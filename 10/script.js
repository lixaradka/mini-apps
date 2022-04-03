//                                 Задание 1
// 1) Описать функцию-конструктор Shop, которая создает объект магазина. У магазина есть два свойства -  название и адрес.
// С помощью этого конструктора создать два объекта - например, для магазинов Green и ProStore (можно любые).
// Добавить эти объекты в массив shops.
// В итоге должен получиться массив объектов типа:
// [{title: 'Green', address:  'ул. Петра Мстиславца 11, Минск'},{title: 'ProStore', address:  'пр-т Дзержинского, 126, Минск'}]
// 2) С помощью метода map получить массив, в котором будут содержаться только адреса магазинов. То есть:
// ['ул. Петра Мстиславца 11, Минск', 'пр-т Дзержинского, 126, Минск']

function Shop(title,addres) {
    this.title = title;
    this.addres = addres;
    this.getDescription = function() {
        return `${this.title},${this.addres}`
    }

} 
let adidas = new Shop('adidas','gdetoTam');
let nike = new Shop('nike','gdetoTut');
let shops = [];
shops.push(adidas);
shops.push(nike);


let addreses = shops.map(shop => {
    for (let i=0;i<shops.length;i++){
    return shops[i].addres
    }
}); 
console.log(addreses);


//                                Задание 2
// По данному url расположена задача:
// https://jsonplaceholder.typicode.com/todos/1
// В html предусмотреть <div></div>
// Достать с сервера заголовок задачи и отобразить его в div.

let httpRequest = new XMLHttpRequest();

httpRequest.onload = function() {
    let obj = JSON.parse(httpRequest.responseText)
    let div = document.querySelector('div')
    div.innerText = obj.title
    
}

httpRequest.open("GET", 'https://jsonplaceholder.typicode.com/todos/1');
httpRequest.send();


//                                 Задание 3
// Запросом на сервер по url https://jsonplaceholder.typicode.com/todos достать задачи.
// Отобразить первые 20 задач списком ul на странице. Содержимое каждого li - поле title объекта задачи.

let httpRequest = new XMLHttpRequest();

httpRequest.onload = function() {
    let obj = JSON.parse(httpRequest.responseText)
    console.log(httpRequest.responseText)
    for( let i = 0; i < 20; i++){
                let li = document.createElement('li');
                li.innerText = obj[i].title;
                document.body.appendChild(li);
            }
}

httpRequest.open("GET", 'https://jsonplaceholder.typicode.com/todos');
// httpRequest.send();


//                                 Задание 4
// Отобразить на странице 10 первых комментариев с сервера https://jsonplaceholder.typicode.com/comments
// Оформить тегами как в ПРИМЕРЕ.
// Порядок работы:
// 1) записать в переменную блок для отрисовки результата.
// 2) описать функцию отрисовки результата (напр. addInfo). Функция принимает 3 параметра - тег, содержимое и название класса для CSS. Она создает тег, наполняет его текстом, добавляет класс и помещает в блок на страницу.
// 3) создать http-запрос и получить результат в виде массива объектов (через JSON.parse). Записать этот результат в переменную, т.к. с ним будем //дальше работать.
// 4) внутри функции .onload:
// - обойти через цикл первые 10 элементов массива
// - вызвать функцию addInfo 3 раза: для добавления на страницу имени, имейла и комментария.
// 5) прописать CSS для классов.


let httpRequest = new XMLHttpRequest();

function createTag(Name, content, name_){
    let tag = document.createElement(Name);
    tag.innerText = content;
    document.body.appendChild(tag);

    tag.classList.add(name_);
}

httpRequest.onload = function(){
    let obj = JSON.parse(httpRequest.responseText);
    console.log(obj);
    
    for(let i = 0; i < 10; i++){
        createTag('H1', obj[i].name, 'headimg')
        createTag("p", obj[i].email, 'email')
        createTag("p", obj[i].body, 'text')
    }
}
httpRequest.open("GET", 'https://jsonplaceholder.typicode.com/comments');
httpRequest.send();

//                                 Задание 5

function createIcon(value){
    let result = `http://openweathermap.org/img/wn/${value}@2x.png`
    return result
}

const current = document.querySelector('.current');
const forecast = document.querySelector('.forecast');

function createElem(tegName, content, nameClass, parent){
    let teg = document.createElement(tegName);
    teg.innerText = content;
    parent.appendChild(teg);
    teg.classList.add(nameClass);
}

function getForecast(linkAPI){
    let httpRequest = new XMLHttpRequest();

    httpRequest.onload = function(){
    
        let country = JSON.parse(httpRequest.responseText);
        createElem("p", country.city.name, "country", current)
    
        //-----------------//
    
        let data = JSON.parse(httpRequest.responseText);
        createElem("p", data.list[0].dt_txt, "time", current) //TIME
    
        //-----------------//
    
        let icon = JSON.parse(httpRequest.responseText);
        let iconId = icon.list[0].weather[0].icon;
    
        //-----------------//
    
        let linkIcon = createIcon(iconId);
        const images = document.createElement('IMG');
        images.setAttribute('src', linkIcon);
        images.classList.add('imgce')
        current.appendChild(images);  //  Images
    
        //-----------------//
    
        let weather = JSON.parse(httpRequest.responseText);
        createElem("H2", Math.round(weather.list[0].main.temp), "weather", current)//Weather
    
        //-----------------//
       //-----------------//
    
       for(let i = 0; i < 40; i +=8){
           createElem("div", '', "row", forecast)
    
            let weather = JSON.parse(httpRequest.responseText);
            createElem("p", Math.round(weather.list[i].main.temp), "weatherforecast", forecast);
            let icon = JSON.parse(httpRequest.responseText);
            let iconId = icon.list[i].weather[0].icon;
    
            //-----------------//
    
            let linkIcon = createIcon(iconId);
            const images = document.createElement('IMG');
            images.setAttribute('src', linkIcon);
            images.classList.add('imgcebott')
            forecast.appendChild(images); 
    
    
            let data = JSON.parse(httpRequest.responseText);
            createElem("p", data.list[i].dt_txt, "time", forecast);
       }
    
    }
    
    httpRequest.open("GET", linkAPI);
    
    httpRequest.send();
}

navigator.geolocation.getCurrentPosition(
    function(position) {

                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
    
                let link = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=248dee22376dff44b5f737f243fc02c6`
                getForecast(link)
	}
);
