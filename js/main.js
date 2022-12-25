let buttonNext = document.querySelector(".next");
let buttonPrevios= document.querySelector(".prev");
let content = document.querySelector(".content");
let a = 0;
                        // СЛАЙДЕР
buttonNext.onclick = function(){
    a++;
    if(a > 2){
        a = 0;
        content.classList.remove("sea")
    }
    if( a == 1){
        content.classList.add("tree");
    } else if (a == 2) {
        content.classList.remove("tree");
        content.classList.add("sea");
    }
    
}

buttonPrevios.onclick = function(){
    if( a == 2){
        content.classList.remove("sea");
        content.classList.add("tree");
    } else if ( a == 1) {
        content.classList.remove("tree");
    }
    a--;
    if (a < 0){
        a = 2;
        content.classList.add("sea");
    }
}
                                // АНИМАЦИЯ ПОЛЗУНКА
let range = document.querySelectorAll(".range-slider");
    for(let item of range){
        let range = item.querySelector(".range-slider__range");
        let value = item.querySelector('.range-slider__value');
        range.oninput = function() {
            value.innerHTML = range.value;
        }
    }

                                // ИЗМЕНЕНИЕ СВОЙСТВА ПО КЛИКУ

let season = document.querySelectorAll(".sizon-input");
    for(let i=0; i < season.length; i++){
        season[i].firstElementChild.onclick = function(){
        searchObj.season[i] = !searchObj.season[i];
        }
    }

let solo = document.getElementById("solo");
let group = document.getElementById("group");
    solo.onclick = function() {
        searchObj.group = false;
        searchObj.solo = true;
    }
    group.onclick = function() {
        searchObj.solo = false;
        searchObj.group = true;
    }
                                // ОБЪЕКТ ПОИСКА
let searchObj = {
    season:[false,false,false,false],
    days: 1,
    company: 1,
    money: 100000,
    solo: false,
    group: true,
};


                            // ПОИСК И ОТРИСОВКА
let btnSearch = document.querySelector(".btn-search");

btnSearch.onclick = function(){
    searchObj.days = document.querySelector(".date-range").value
    searchObj.money = document.querySelector(".amount-money").value;
    searchObj.company = document.querySelector(".amount").value;

    if(!searchObj.season.includes(true)){
        searchObj.season.forEach(function(item, index, array) {
           array[index] = true; 
          });
          
    if(searchObj.money == 10000){
        searchObj.money = 25000;
    }
    }
    let sorting = document.querySelectorAll(".sorting");
    sorting.forEach(item => item.classList.remove("sorting--active"));
    sorting[0].classList.add("sorting--active");
    let bside = document.querySelector(".bside");
    bside.innerHTML = `<div class="bside-sort">
    <div class="bside-sort__hint">Сортировать по:</div>
    <div class="bside-sort__buttons">
        <button class="sorting sorting-popular sorting--active">По популярности</button>
        <button class="sorting sorting-min">Дешевле</button>
        <button class="sorting sorting-max">Дороже</button>
    </div>
</div>`;
    sortingClick();
    filtered(turArr);
}
let filteredArr = [];
                            // ФИЛЬТРАЦИЯ ТУРОВ
function filtered(arr){
    
    let newArr = arr.filter(function(item){
      for(let i=0; i < searchObj.season.length; i++){
        if(searchObj.season[i] == item.season[i] && item.season[i] !== false){
          if((searchObj.money / searchObj.company) >= item.money){
            if(searchObj.days <= item.days){
              if(searchObj.company <= item.places){
                return item;
              }
            }
          }
        }         
      }
    });

    if(notFound(newArr) == false){
        for(let elem of newArr){
            addFilteredElem(elem);
            filteredArr.push(elem);
        }
    } else {
        let newElem = notFound(newArr);
        let bside = document.querySelector(".bside");
    bside.appendChild(newElem);
    }
    openForm();
  }

                            //Проверка на наличие туров
  function notFound(arr){
    if(arr.length == 0){
        return createElement(`<div class="notFound"> Oops. По вашему запросу ничего не найдено &#9785</div>`)
    } else {
        return false;
    }
  }


                                //Функция добавления элемента
function addFilteredElem(item){
    let newCost;
    let oldCost
    if(searchObj.solo !== true){
        newCost = calculateMul(item,searchObj.company);
        oldCost = calculateMul(item,searchObj.company) + calculateMul(item,searchObj.company) * 0.2;
    } else {
        newCost = calculateMul(item,20);
        oldCost = calculateMul(item,20) + calculateMul(item,20) * 0.2;
    }

    let newElem = createElement(`<div class="bside-elem">
<div class="img">
    <img src="${item.url}" alt="img">
</div>
<div class="info">
    <h3>${item.h3}</h3>
    <h5>${item.h5}</h5>
    <div>${item.text}</div>
</div>
<div class="info2">
    <div class="days_night">
        <div class="morning"> ${item.days} Дней</div>
        <div class="night"> ${item.days - 1} Ночи</div>
    </div>
    <div class="cost">
        <p class="old-cost">от ${oldCost} р.</p>
        <p class="new-cost">от ${newCost} р.</p>
        <p class="cost-validity">Горячая цена!</p>
    </div>
    <p class="organization__dates">Ближайшие даты:</p>
    <ul class="organization__list-dates"><li><p>1 окт - 5 окт</p></li><li><p>15 окт - 19 окт</p></li></ul>
    <a href="#" class="buy">Заказать тур</a>
</div>
</div>`);
    let bside = document.querySelector(".bside");
    bside.appendChild(newElem);
}


openForm();


                        //КАЛЬКУЛЯТОР ЦЕНЫ
function calculateMul(elem, amount){
    return elem.money * amount;
}
                        //ПЛАВНАЯ ПРОКРУТКА
let btnContainer = document.querySelector(".searchBtn");
let container3 = document.querySelector(".content3");
btnContainer.onclick = function(){
    container3.scrollIntoView({behavior: "smooth"});
}

                        // ВЗАИМОДЕЙСТВИЕ С КНОПКАМИ СОРТИРОВКИ
function sortingClick(){
let sorting = document.querySelectorAll(".sorting");
let sortingArray = [];
for(let elem of sorting){
    sortingArray.push(elem)
    elem.onclick = function(){
        let bside = document.querySelector(".bside");
        let notFound = bside.querySelector(".notFound");
        if(notFound){
            return;
        }
        let bsideElem = bside.querySelectorAll(".bside-elem");
        for(let elem of bsideElem){
             elem.remove();
        }
    if(elem.classList.contains("sorting-min")){
        sortingMinArray(filteredArr);
    } else if (elem.classList.contains("sorting-max")){
        sortingMaxArray(filteredArr);
    } else {
       sortingPopular(filteredArr);
    }
    for(let elem of sorting){
        elem.classList.remove("sorting--active")
    }
    elem.classList.add("sorting--active");
    }
}
}


                        // СОРТИРОВКА ПО ЦЕНЕ

function sortingMinArray(arr){
    let newArr = arr.slice(0);
    newArr.sort(function(a, b) {
        if (a.money > b.money) return 1; // если первое значение больше второго
        if (a.money == b.money) return 0; // если равны
        if (a.money < b.money) return -1; // если первое значение меньше второго
      });
    for(let elem of newArr){
        addFilteredElem(elem);
    }
    openForm();
}

function sortingMaxArray(arr){
    let newArr = arr.slice(0);
    newArr.sort(function(a, b) {
        if (a.money < b.money) return 1; // если первое значение больше второго
        if (a.money == b.money) return 0; // если равны
        if (a.money > b.money) return -1; // если первое значение меньше второго
      });
    for(let elem of newArr){
        addFilteredElem(elem);
    }
    openForm();
}

function sortingPopular(arr){
    for(let elem of arr){
        addFilteredElem(elem);
    }
    openForm();
}


function hiddenForm(){
    let form = document.querySelector(".form");
    let closeForm = document.querySelector(".closeForm");
    closeForm.addEventListener("click",function(){
    form.classList.remove("activeForm");
});
}

function openForm(){
    let form = document.querySelector(".form");
    let buyture = document.querySelectorAll('.buy');
for (let elem of buyture){
    elem.addEventListener("click",function(){
        let parent = elem.parentNode;
        let days = parent.querySelector(".morning").innerHTML;
        let nights = parent.querySelector(".night").innerHTML;
        let money = parent.querySelector(".new-cost");
        let el = createElement(`
        <div class="buy-tour">
            <div class="buy-tour-text">
                <h3>Набор в группу</h3>
            </div>
            <div class="priseAndDays">
                <div class="priseForm">
                    <div class="moneyForm">${money.innerHTML}</div>
                    <div class="companyForm">за ${searchObj.company} чел.</div>
                </div>
                <div class="daysForm">
                     <div class=" day-container"><img src="png/sunny.png" alt=""><div class="dayForm">${days}</div></div>
                     <div class="night-container">
                        <img src="png/moon1.png" alt=""><div class="nightForm">${nights}</div>
                     </div>
                </div>
            </div>
            <div class="input-text">
                <div class="input-field">
                    <input type="text" placeholder="Ваше имя">
                </div>
                <div class="input-field">
                    <input type="tel" placeholder="Ваш телефон" maxlength="20">
                </div>
                <div class="input-field">
                    <input type="email" placeholder="Ваш email">
                </div>
                <div class="textarea-field">
                    <textarea name="" id="" cols="30" rows="10" placeholder="Ваши комментарии"></textarea>
                </div>                
            </div>
            <button class="btnForm">Отправить заявку</button>
            <div class="notice">Нажимая на кнопку выше вы соглашаетесь c<br><a href="#">политикой конфиденциальности</a></div>
            <div class="closeForm"><img src="png/closeForm.svg" alt="close"></div>`);
            form.innerHTML = '';
            form.appendChild(el);
        form.classList.add("activeForm");
        hiddenForm();
    })
}
    
}
