const sum = document.getElementById('sum');
const sub = document.getElementById('sub');
const div = document.getElementById('div');
const mul = document.getElementById('mul');
const mod = document.getElementById('mod');


sum.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    document.querySelector('#result').textContent = (x + y);
})

sub.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    document.querySelector('#result').textContent = (x - y);
})

div.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    document.querySelector('#result').textContent = (x / y);

})

mul.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    document.querySelector('#result').textContent = (x * y);

})

mod.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    document.querySelector('#result').textContent = (x % y);
})


// using switch

function render (result) {
  document.querySelector('#result').textContent = result;
}

document.getElementById('actions').addEventListener('click', event => {
  if(event.target.tagName === 'BUTTON'){

  let result = null

  const firstNumber = Number(document.querySelector('#Number-1').value)
  const secondNumber = Number(document.querySelector('#Number-2').value)

    switch (event.target.id) {
      case 'sum':
        result = firstNumber + secondNumber
        break;
      case 'substraction':
        result = firstNumber - secondNumber
        break;
      case 'multiply':
        result = firstNumber * secondNumber
        break;
      case 'divide':
        result = firstNumber / secondNumber
        break;
      case 'modulus':
        result = firstNumber % secondNumber
        break;
      default:
        break;
    }
    render(result);
  }
})
