//                                     Задание 1

let ul = document.querySelector('ul');
let form = document.querySelector('form'); 
let tasks = [];

function newLi(tasks){
    for(let i = 0;i < tasks.length;i++){
    let checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete';
    deleteBtn.style.background = 'DarkSeaGreen';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '5px';

    let newLi = document.createElement('li');
    newLi.innerText = tasks[i];
    ul.appendChild(newLi);
    newLi.prepend(checkbox);
    newLi.append(deleteBtn);
    }
}

if(localStorage.tasks) {
    tasks = JSON.parse(localStorage.tasks)
    newLi(tasks)
}

form.addEventListener('submit' , function (event) {
    event.preventDefault();
    let string = form.querySelector('.string');
    let checkbox = document.createElement('input');
    let deleteBtn = document.createElement('button');
    checkbox.setAttribute("type", "checkbox");
    deleteBtn.innerText = 'delete';
    deleteBtn.style.background = 'DarkSeaGreen';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '5px';
    let addLi = document.createElement('li');
    addLi.innerText = string.value;
    ul.appendChild(addLi);
    addLi.prepend(checkbox);
    addLi.append(deleteBtn);

    tasks.push(string.value);
    localStorage.tasks = JSON.stringify(tasks);
    console.log(localStorage.tasks);



deleteBtn.addEventListener('click' , function (event) {
    addLi.remove()
})

    string.value = ''
})  



let DoneAll = document.createElement('button')
DoneAll.innerText = 'DoneAll'
document.body.append(DoneAll)


DoneAll.addEventListener('click' , function (event) {
    let liList = ul.querySelectorAll('li')
    for(let i=0;i<liList.length;i++){
    liList[i].style.textDecoration = 'line-through'
}
// })


//                                     Задание 2

//1)
let name = {name:'neNikon'};
let nameStr = JSON.stringify(name);
let nameParse = JSON.parse(nameStr);

//2)
let user = userParse
localStorage.user = user
let newUser = localStorage.user


//                                     Задание 3
let imgArr = document.querySelectorAll('img')

for(let i = 0;i < imgArr.length;i++) {
    imgArr[i].addEventListener('click' , function (event) {
        for(let i = 0;i < imgArr.length;i++) {
            let target = event.target;
            imgArr[i].classList.remove('active');
            target.classList.add('active');
            
            let src = target.getAttribute('src');
            document.body.style.background = `url(${src})`;
            document.body.style.backgroundSize = 'cover';
        }
    })
}














