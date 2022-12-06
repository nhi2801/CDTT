function chooseFile(fileInput){
    if (fileInput.files && fileInput.files[0]){
        var reader = new FileReader();

        reader.onload = function (e){
            $('#myimg').attr('src', e.target.result);
        }
        reader.readAsDataURL(fileInput.files[0]);
        // var ImgToUpload = files[0];
    }
}