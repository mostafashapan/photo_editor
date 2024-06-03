let saturate = document.getElementById("saturate");
let Contrast = document.getElementById("Contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let canv = document.getElementById('canvs');
let ctx = canv.getContext('2d');

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.querySelector("span");
let imgBox = document.querySelector('.img-box');



window.onload = function () {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}
upload.onchange = function () {
    resetValue()
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';

    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
        img.src = file.result;
    }
    img.onload = function () {
        canv.width = img.width;
        canv.height = img.height;
        // const canv = Document.getElementById('canvas');
        ctx.drawImage(img, 0, 0, canv.width, canv.height);
        img.style.display = 'none';
    }
}

// get all the filters and put it in one variable 
// because if i add an event listener on each filter the other filter will remove the effect of the other event
let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', function () {
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${Contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img, 0, 0, canv.width, canv.height);

    })
})

function resetValue() {
    img.style.filter = 'none';
    saturate.value = '100';
    Contrast.value = '100';
    brightness.value = '100';
    sepia.value = '100';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
}
reset.addEventListener('click', function () { resetValue() });
download.onclick = function () {
    download.href = canv.toDataURL();
}