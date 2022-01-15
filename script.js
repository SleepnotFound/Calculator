const buttons = document.querySelectorAll('button');
const results = document.querySelector('.result');
const previous = document.querySelector('.history');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        inputing(event);
        previous.textContent = `${lastKey}`;
        results.textContent = `${total.num1.join('')}` + total.op + `${total.num2.join('')}`;
    })
})

let total = {
    num1: [],
    num2: [],
    op: ''
}
let lastKey = 'num1';

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
            if (!total.op) {
                console.log('working on num1')
                if (!total.num1.length) total.num1.push('0', value);
                else if (!total.num1.includes(value)) total.num1.push(value);
            }
            if (total.op) {
                console.log('working on num2')
                if (!total.num2.length) total.num2.push('0', value);
                else if (!total.num2.includes(value)) total.num2.push(value);
            }
            break;
        case 'number': 
            if (!total.op) {
                total.num1.push(value)
                lastKey = 'num1';
                console.log(total.num1)
            }
            else if (total.op) {
                total.num2.push(value)
                lastKey = 'num2';
                console.log(total.num2)
            }
            break;
        case 'operator': 
            if (!total.num1.length) {
                //negative allowed once otherwise do nothing
                console.log('push number first')
            }
            else if (total.num1.length && !total.op) {
                total.op = value;
                lastKey = 'op';
                console.log('lastKey: ' + lastKey)
            }
            else if (total.num1.length && total.op && total.num2.length) {
                operate(total);
                total.op = value;
                lastKey = 'op';
            }
            break;
        case 'operate':
            if (total.num1.length && total.op && total.num2.length) {
                operate(total);
            }          
            break;
        case 'delete':
            console.log('lastKey: ' + lastKey)
            lastKey == 'op'? total.op = '': total[lastKey].pop();
            if (!total.num2.length) lastKey = 'op'
            if (!total.op) lastKey = 'num1';
            break;
        case 'clear':
            total.num1 = []
            total.num2 = []
            total.op = '';
            lastKey = 'num1'
            break;
    }
}