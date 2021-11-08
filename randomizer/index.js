const ColorChangeBtn = document.querySelector('.change-button');
const ColorBox1 = document.getElementById('color-box-1');
const ColorBox2 = document.getElementById('color-box-2');
const ColorBox3 = document.getElementById('color-box-3');
const body = document.querySelector('.color-container');
const copyColorText = document.querySelectorAll('.color')

//event listeners

ColorChangeBtn.addEventListener('click', randomColor);
copyColorText.forEach((el) => {el.addEventListener('click', copied)
console.log('copy')})

//functions


function randomColor(){
    let randomize = Math.floor(Math.random() * 16777215).toString(16);
    let randomize2 = Math.floor(Math.random() * 16777215).toString(16);
    let randomize3 = Math.floor(Math.random() * 16777215).toString(16);
    ColorBox1.innerHTML = `#${randomize}`;
    ColorBox2.innerHTML = `#${randomize2}`;
    ColorBox3.innerHTML = `#${randomize3}`;
    body.style.background = `linear-gradient(to right, #${randomize} 0%, #${randomize} 33%, #${randomize2} 33%, #${randomize2} 67%, #${randomize3} 67%, #${randomize3} 100%)`;

};

function copyToClipboard(){
    let element = event.target;
    let range;
    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();

      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }

function copied(){
    copyToClipboard();
    alert(`Color has been copied, now paste in the text-area`)
    document.execCommand("copy");
}    


