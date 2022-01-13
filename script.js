const buttons = document.querySelectorAll('button');
const results = document.querySelector('.result');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        //console.log(event.target.className)
        inputing(event);
        results.textContent = `${total.join('')}`;
    })
})

let op = null;
let total = []

//takes in 2 values and operator.returns 1 value
function operate(totalArray,opr) {
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
    total = (''+first).split('');
    console.log(`new total = ${total}`)
}

function inputing(event) {
    let button = event.target.className;
    let value = event.target.id;
    switch (button) {
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
            break;
    }
}

function containsOp (total) {
    const op = ['+','-','*','/']
    return total.some(value => (op.includes(value)));
}