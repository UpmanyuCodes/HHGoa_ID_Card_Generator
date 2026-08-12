/* =========================================
   BUILDER STATE
========================================= */

const nameInput =
    document.getElementById("builder-name");

const stackInput =
    document.getElementById("builder-stack");

const photoInput =
    document.getElementById("builder-photo");

const previewCanvas =
    document.getElementById("builderPreviewCanvas");


let currentPhoto = null;


/* =========================================
   PREVIEW RENDER
========================================= */

async function updatePreview() {

    const name =
        nameInput.value.trim();

    const stack =
        stackInput.value.trim();


    const canvas =
        await createBuilderCanvas({
            name,
            stack,
            photo: currentPhoto
        });


    const previewContext =
        previewCanvas.getContext("2d");


    previewContext.clearRect(
        0,
        0,
        previewCanvas.width,
        previewCanvas.height
    );


    previewContext.drawImage(
        canvas,
        0,
        0
    );
}


/* =========================================
   NAME
========================================= */

nameInput.addEventListener("input", () => {

    updatePreview();

});


/* =========================================
   STACK
========================================= */

stackInput.addEventListener("input", () => {

    updatePreview();

});


/* =========================================
   PHOTO
========================================= */

photoInput.addEventListener("change", (event) => {

    const file =
        event.target.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = (e) => {

        currentPhoto =
            e.target.result;

        updatePreview();

    };


    reader.readAsDataURL(file);

});


/* =========================================
   GENERATE ID
========================================= */

const generateButton =
    document.querySelector(".generate-button");


generateButton.addEventListener("click", async () => {

    const name =
        nameInput.value.trim();

    const stack =
        stackInput.value.trim();


    const canvas =
        await createBuilderCanvas({
            name,
            stack,
            photo: currentPhoto
        });


    canvas.toBlob((blob) => {

        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "hh-goa-builder-id.png";


        link.click();


        URL.revokeObjectURL(url);

    }, "image/png");

});


/* =========================================
   INITIAL PREVIEW
========================================= */

updatePreview();