const buttons = document.querySelectorAll('button');
const results = document.querySelector('.result');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        //console.log(event.target.className)
        inputing(event);
        results.textContent = `${num1.join('')}`;
    })
})

let num1 = [];
let num2 = [];
let op = null;

//takes in 2 values and operator.returns 1 value
function operate(first,second,opr) {
    console.log('operate executed: ' + `${num1} ` + `${op} ` + `${num2} ` )
    first = parseFloat(first.join(''));
    second = parseFloat(second.join(''));
    switch (opr) {
        case '+': first += second;
            num1 = (''+first).split('');
        break;
        case '-': first -= second;
            num1 = (''+first).split('');
        break;
        case '*': first *= second;
            num1 = (''+first).split('');
        break;
        case '/': first /= second;
            num1 = (''+first).split('');
        break;
    }
    op = null;
    num2 = [];
    console.log(`${num1} ` + `${op} ` + `${num2} ` + `= ${num1}`)
}

function inputing(event) {
    //console.log(button);
    let button = event.target.className;
    let value = event.target.id;
    switch (button) {
        case 'number': 
            if (num2.length == 0 && op == null){
            
            num1.push(value);
            console.log('num1: ' + num1)
            }
            else if (num1 && op) {
                num2.push(value);
                console.log('num2:' + num2);
            }
            break;
        case 'operator': 
            if (num1.length && num2.length && op) {
                operate(num1,num2,op);
            }
            if (num1.length != 0 && op == null) {
                op = value;
                console.log('op: ' + op);
            }
            break;
        case 'operate' :
            if (num1 && num2 && op) {
                operate(num1,num2,op);
            }
            break;
        case 'delete' : //backspace 
            break;
        case 'clear':
            num1 = [];
            num2 = [];
            op = null;
            break;
    }
}