const route = document.querySelector('#route');
const time = document.querySelector('.time span');
const selectAB = document.querySelector('#timeAB');
const selectBA = document.querySelector('#timeBA');
const input = document.querySelector('#num');
const button = document.querySelector('button');
const result = document.querySelector('.result');
let num = '';
let value = '';

selectBA.style.display = 'none';

//получить массив данных
const timeAB = [];
for (let i = 0; i < selectAB.length; i++) {
    let time = selectAB[i].value;
    timeAB.push(time);
}
const timeBA = [];
for (let i = 0; i < selectBA.length; i++) {
    let time = selectBA[i].value;
    timeBA.push(time);
}

// отслеживание изменения маршрута 

route.addEventListener('change', () => {
    value = route.value
    changeOption(value)
})

function changeOption(value) {
    if (value === 'из A в B') {
        watAB();
    } else if (value === 'из B в A') {
        watBA();
    } else {
        watABA();
    }
}

function watAB() {
    time.innerHTML = ''
    selectAB.style.display = 'inline-block';
    selectBA.style.display = 'none';
}
function watBA() {
    time.innerHTML = ''
    selectBA.style.display = 'inline-block';
    selectAB.style.display = 'none';
}

function watABA() {
    selectBA.style.display = 'inline-block';
    selectAB.style.display = 'inline-block';
    time.innerHTML = 'обратно'
}

// отслеживание выбора расписания
selectAB.addEventListener('change', () => {

    if (route.value === 'из A в B и обратно в А') {
        selectBA.innerHTML = ''

        //разделить массив на отдельные соствляющие час и мин
        for (let i = 0; i <= timeBA.length - 1; i++) {
            let tmpBA = timeBA[i].split(':');
            let tmpAB = selectAB.value.split(':');

            //время прибытия (+50 мин)
            if (tmpAB[1] > 10) {
                tmpAB[1] = String(Number(tmpAB[1]) + 50 - 60)
                tmpAB[0] = String(Number(tmpAB[0]) + 1)
            } else if ((tmpAB[1] <= 10)) {
                tmpAB[1] = String(Number(tmpAB[1]) + 50)
            }

            // показать время обратно, только если оно позже времени прибытия
            if ((tmpAB[0] <= tmpBA[0] && tmpAB[1] <= tmpBA[1])) {

                let timeToBA = []
                timeToBA.push(`${tmpBA[0]}:${tmpBA[1]}`)

                //показать новый список
                for (let i = 0; i < tmpBA.length - 1; i++) {
                    let time = timeToBA[i]
                    let option = document.createElement('option');
                    option.textContent = time
                    option.value = time

                    selectBA.appendChild(option)
                }
            }
        }
    }
})

// отслеживание инпута 
input.addEventListener('input', (e) => {
    e.preventDefault()
    num = e.target.value
})

// отслеживание нажатия  
button.addEventListener('click', (e) => {
    e.preventDefault()
    createResult()
})

// показать результат
function createResult() {

    let wayABA = "из A в B и обратно в А"
    let ticket = 'билета'
    if (num == 1) {
        ticket = 'билет'
    } else if (num > 4) (
        ticket = 'билетов'
    )

    const costABorBA = 700
    const costABA = 1200

    let cost = (value === wayABA ? costABA : costABorBA)
    let time = (value === wayABA ? timeWayABA() : '50 минут')
    let finishTime = (value === wayABA ? finishTimeABA() : timeWayABorBA())

    //время прибытия из А в В или из В в А
    function timeWayABorBA() {
        let tmp = selectAB.value.split(':');
        if (tmp[1] > 10) {
            tmp[1] = String(Number(tmp[1]) + 50 - 60)
            tmp[0] = String(Number(tmp[0]) + 1)
        } else if ((tmp[1] <= 10)) {
            tmp[1] = String(Number(tmp[1]) + 50)
        }
        let time = ` в ${tmp[0]}:${tmp[1]}`
        return time
    }

    //время прибытия из А в В потом обратно в А

    function finishTimeABA() {
        let tmpBA = selectBA.value.split(':');

        if (tmpBA[1] > 10) {
            tmpBA[1] = String(Number(tmpBA[1]) + 50 - 60)
            tmpBA[0] = String(Number(tmpBA[0]) + 1)
        } else if ((tmp[1] <= 10)) {
            tmpBA[1] = String(Number(tmpBA[1]) + 50)
        }
        let finish = `в ${tmpBA[0]}:${tmpBA[1]}`

        return finish
    }

    //время в пути по марштруту из А в В потом обратно в А
    function timeWayABA() {
        let tmpAB = selectAB.value.split(':');
        let tmpBA = selectBA.value.split(':');

        if (tmpBA[1] > 10) {
            tmpBA[1] = String(Number(tmpBA[1]) + 50 - 60)
            tmpBA[0] = String(Number(tmpBA[0]) + 1)
        } else if ((tmp[1] <= 10)) {
            tmpBA[1] = String(Number(tmpBA[1]) + 50)
        }
        if (tmpAB[1] > tmpBA[1]) {
            tmpBA[1] = Number(tmpAB[1]) - (Number(tmpBA[1]));
            tmpBA[0] = Number(tmpBA[0]) - (Number(tmpAB[0]));
            console.log(tmpBA[0], tmpBA[1])
        } else if (tmpAB[1] < tmpBA[1]) {
            tmpBA[1] = Number(tmpBA[1] - tmpAB[1]);
            tmpBA[0] = Number(tmpBA[0] - tmpAB[0]);
        }
        let finish = `${tmpBA[0]} час(а) ${tmpBA[1]} минут`
        return finish
    }

    // цена
    let sum = num * cost

    // текст 
    result.innerHTML = `<p> Вы выбрали ${num} ${ticket} по маршруту ${value} стоимостью ${sum}р. <br>
    Это путешествие займет у вас ${time}. <br>
    Теплоход отправляется в ${selectAB.value}, а прибудет ${finishTime}.</p>`

}
