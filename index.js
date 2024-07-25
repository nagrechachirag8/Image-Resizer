const removeButton = document.getElementById('remove-button');
const imageContainer = document.getElementById('image-container');
const uploadedImage = document.getElementById('uploaded-image');
const imageInput = document.getElementById('image-input');
const imageDownload = document.getElementById('download-button');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
let download;

imageInput.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
            uploadedImage.onload = function () {
                const width = 300;
                const scaleFactor = width / uploadedImage.width;
                canvas.width = width;
                canvas.height = uploadedImage.height * scaleFactor;
                ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

                imageContainer.style.display = 'block';
                download = true
            };
        };

        reader.readAsDataURL(file);
    } else {
        imageContainer.style.display = 'none';
    }
});

const resizedWidth = document.getElementById('selected-width');
const resizedHeight = document.getElementById('selected-height');
let imgWidht;
let imgHeight;

resizedWidth.addEventListener('change', (e) => {
    imgWidht = Number(e.target.value)
})

resizedHeight.addEventListener('change', (e) => {
    imgHeight = Number(e.target.value)
})

document.getElementById('resize-button').addEventListener('click', () => {
    resizeImage(imgWidht,imgHeight);
})

function resizeImage(imgWidht,imgHeight) {
    uploadedImage.width = imgWidht
    uploadedImage.height = imgHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage,0,0,uploadedImage.width,uploadedImage.height)
}

removeButton.addEventListener('click', () => {
    uploadedImage.src = '';
    imageContainer.style.display = 'none';
    imageInput.value = '';
    resizedWidth.value = '';
    resizedHeight.value = '';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;
    download = false;
})

imageDownload.addEventListener('click', () => {
    if(download){
        const dataURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'resized-image.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }else{
        alert('Please select the image first!')
    }
})