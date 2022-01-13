const buttons = document.querySelectorAll('button');
const results = document.querySelector('.result');
const previous = document.querySelector('.history');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        inputing(event);
        previous.textContent = `${last.join('')}`;
        results.textContent = `${total.join('')}`;
    })
})

let op = null;
let total = []
let last = [];

//takes in 2 values and operator.returns 1 value
function operate(totalArray,opr) {
    last = totalArray;
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
    console.log(`new total = ${total}`)
}

function inputing(event) {
    let button = event.target.className;
    let value = event.target.id;
    switch (button) {
        case 'decimal':
            if (!total.length || total[total.length - 1] == op) {
                total.push('0', value)
            }
            else if (!containsOp(total) && !total.includes('.')) {
                total.push(value)
            }
            else if (containsOp(total) && !total.includes('.',total.indexOf(op))) {
                total.push(value);
            }
            break;
        case 'number': 
            total.push(value);
            break;
        case 'operator': 
            if (!total.length) {
                console.log('insert a number first')
            }
            else if (total.length && !containsOp(total)) {
                op = value;
                total.push(value);
            }
            else if (containsOp(total) && total[total.length-1] != op) {
                operate(total,op);
                op = value;
                total.push(value);
            }
            break;
        case 'operate' :
            if (containsOp(total) && total[total.length-1] != op) {
                operate(total,op)
            }
            break;
        case 'delete' : //backspace 
            total.pop();
            break;
        case 'clear':
            op = null;
            total = [];
            last = []
            break;
    }
}

function containsOp (total) {
    const op = ['+','-','*','/']
    return total.some(value => (op.includes(value)));
}