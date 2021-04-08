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


