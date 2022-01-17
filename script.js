const buttons = document.querySelectorAll('button');
const results = document.querySelector('.result');
const previous = document.querySelector('.history');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        inputing(event);
        previous.textContent = `${currentKey}`;
        results.textContent = `${total.num1.join('')}` + total.op + `${total.num2.join('')}`;
    })
})

let total = {
    num1: [],
    num2: [],
    op: ''
}
let currentKey = 'num1';

//takes in 2 values and operator.returns 1 value
function operate(totalObject) {
    console.log(totalObject)

    /* last = totalArray;
    let first = totalArray.slice(0, totalArray.indexOf(opr));
    let second = totalArray.slice(totalArray.indexOf(opr)+1, totalArray.length);
    
    first = parseFloat(first.join(''));
    second = parseFloat(second.join(''));
    console.log('after parsing: ' + `${first} ` + `${opr} ` + `${second} ` )
    switch (opr) {
        case '+': first += second;
        break;
        case '-': first -= second;
        break;
        case '*': first *= second;
        break;
        case '/': first /= second;
        break;
    }
    op = null;
    if (first == Infinity) {
        last.push('= Division by zero...')
        first = '0';
    }
    first = Math.round(first * 100) / 100;
    total = (''+first).split('');
    console.log(`new total = ${total}`) */
}

function inputing(event) {
    let button = event.target.className;
    let value = event.target.id;
    switch (button) {
        case 'decimal':
            let key = total[currentKey];
            if (!key.length || key[(key.length-1)] == '-') key.push('0', value);
            else if (!key.includes(value)) key.push(value);
            break;
        case 'number': 
            total[currentKey].push(value);
            break;
        case 'operator': 
            if (total.num1.length && !total.op) {
                total.op = value;
                currentKey = 'num2';
            }
            else if (total.num1.length && total.op && total.num2.length) {
                operate(total);
                total.op = value;
                currentKey = 'num2';
            }
            break;
        case 'negative':
            if (!total[currentKey].length) {
                total[currentKey].push(value);
            }
            else if(total.num1.length && !total.op) {
                total.op = value;
                currentKey = 'num2';
            }
            break;
        case 'operate':
            if (total.num1.length && total.op && total.num2.length) {
                operate(total);
            }          
            break;
        case 'delete':
            (!total.num2.length && total.op)? total.op = '': total[currentKey].pop();
            if (!total.op) currentKey = 'num1'
            break;
        case 'clear':
            total.num1 = []
            total.num2 = []
            total.op = '';
            currentKey = 'num1'
            break;
    }
}
