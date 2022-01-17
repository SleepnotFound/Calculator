const buttons = document.querySelectorAll('button');
const results = document.querySelector('.result');
const previous = document.querySelector('.history');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        inputing(event.target.className, event.target.id);
        previous.textContent = `${prevResult}`;
        results.textContent = `${total.num1.join('')}` + total.op + `${total.num2.join('')}`;
    })
})
let total = {
    num1: [],
    num2: [],
    op: ''
}
let currentKey = 'num1';
let prevResult = '';

//takes in all object values. returns new num1 value
function operate(totalObject) {
    let n1 = parseFloat(totalObject.num1.join(''));
    let n2 = parseFloat(totalObject.num2.join(''))
    prevResult = `${n1} ` + `${totalObject.op} ` + `${n2} `;
    
    switch (totalObject.op) {
        case '+': n1 += n2;
        break;
        case '-': n1 -= n2;
        break;
        case '*': n1 *= n2;
        break;
        case '\u00F7': n1 /= n2;
        break;
    }
    if (n1 == Infinity || n1 == -Infinity) {
        prevResult = 'Division by 0'
        n1 = 0;
    }
    n1 = Math.round(n1 * 100) / 100;
    total.num1 = (''+n1).split('');
    total.num2 = [];
    currentKey = 'num1';
    total.op = '';
}

//controls what is stored in object when button is pressed.
function inputing(eventClass, eventId) {
    let button = eventClass;
    let value = eventId;
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
            if (!total[currentKey].length && value == '-') {
                total[currentKey].push(value);
            }
            else if (total.num1.length && !total.op) {
                if (total.num1[total.num1.length-1] == '-') total.num1.push('0');
                total.op = value;
                currentKey = 'num2';
            }
            else if (total.num1.length && total.op && total.num2.length){
                inputing('operate', value)
                total.op = value;
                currentKey = 'num2';
            }
            break;
        case 'operate':
            if (total.num1.length && total.op && total.num2.length) {
                if (total.num2[total.num2.length-1] == '-') total.num2.push('0');
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
            prevResult = '';
            break;
    }
}
