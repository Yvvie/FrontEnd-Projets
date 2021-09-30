const sum = document.getElementById('sum');
const sub = document.getElementById('sub');
const div = document.getElementById('div');
const mul = document.getElementById('mul');
const mod = document.getElementById('mod');


sum.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    alert(x + y);
})

sub.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    alert(x - y);
})

div.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    alert(x / y);

})

mul.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    alert(x * y);

})

mod.addEventListener('click', () => {
    let x = parseInt(document.getElementById('Number-1').value)
    let y = parseInt(document.getElementById('Number-2').value)
    alert(x % y);
})


// using switch

function render (result) {
  document.querySelector('#result').textContent = result;
}

document.getElementById('actions').addEventListener('click', event => {
  if(event.target.tagName === 'BUTTON'){

  let result = null

  const firstNumber = Number(document.querySelector('#first-number').value)
  const seondNumber = Number(document.querySelector('#second-number').value)

    switch (event.target.id) {
      case 'sum':
        result = firstNumber + seondNumber
        break;
      case 'substraction':
        result = firstNumber - seondNumber
        break;
      case 'multiply':
        result = firstNumber * seondNumber
        break;
      case 'divide':
        result = firstNumber / seondNumber
        break;
      case 'modulus':
        result = firstNumber % seondNumber
        break;
      default:
        break;
    }
    render(result);
  }
})
