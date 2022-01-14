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
    totalArray[0]==op? negativeParse(totalArray): null//positiveParse
    let first = totalArray.slice(0, totalArray.indexOf(opr));
    let second = totalArray.slice(totalArray.indexOf(opr)+1, totalArray.length);

    first = parseFloat(first.join(''));
    second = parseFloat(second.join(''));
    console.log('after parsing: ' + `_${first}_ ` + `_${opr}_ ` + `_${second}_ ` )
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
            if (!total.length || total[total.length - 1] == op) {                       //at start or after an op
                total.push('0', value)
            }
            else if (!op && !total.includes('.')) {                      //no op, no decimal. first 'number'
                total.push(value)
            }
            else if (op && !total.includes('.',total.indexOf(op))) {     //has op,no decimal after op. second 'number'
                total.push(value);
            }
            break;
        case 'number': 
            total.push(value);
            break;
        case 'operator': 
            if (value == '-') {
                containsNegative(value);
            }
            else if (!total.length) {                                       //lenght is 0
                console.log('insert a number first')
            }
            else if (total.length && !op) {                                 //lenght>0 and no op
                op = value;
                console.log(op)
                total.push(value);
            }
            else if (op && total[total.length-1] != op) {                   //has op and isnt last char
                operate(total,op);
                op = value;
                total.push(value);
            }
            break;
        case 'operate' :
            if (op && total[total.length-1] != op) {                       //has op and isnt last char
                operate(total,op)
            }
            break;
        case 'delete' :
            let pop = total.pop();
            pop;
            if (pop == op) op = null;
            break;
        case 'clear':
            op = null;
            total = [];
            last = []
            break;
    }
}

function containsNegative (v) {
    if (!total.length) {                                                //push only at begining
        total.push(v)
        console.log(`pushed negative at beginning`)
    }
    else if (op && total[total.length-1]==op) {                         //push only after op
        total.push(v);
        console.log('pushed negative after op')     //bug continues inserting '-'
    }
    else if (!op && total[total.length-1] !='-') {                      //push actual operator 
        op = v;
        console.log('pushed operator' + v)
        total.push(v)
    }
}
function negativeParse (array) {
    let first = array.slice(0, array.indexOf('-',1));
    let second = array.slice(array.indexOf('-',1)+1, array.length);
    console.log('ng: ' + first + '_' + second)
}
function positiveParse (array) {
    //last left off
}