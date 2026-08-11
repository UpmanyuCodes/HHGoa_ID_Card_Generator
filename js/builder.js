/* =========================================
   BUILDER STATE
========================================= */

const nameInput = document.getElementById("builder-name");
const stackInput = document.getElementById("builder-stack");
const photoInput = document.getElementById("builder-photo");

const idName = document.querySelector(".id-name");
const idStack = document.querySelector(".id-stack");
const photoPlaceholder = document.querySelector(".photo-placeholder");


/* =========================================
   NAME
========================================= */

nameInput.addEventListener("input", () => {

    const value = nameInput.value.trim();

    idName.textContent =
        value || "YOUR NAME";
});


/* =========================================
   STACK
========================================= */

stackInput.addEventListener("input", () => {

    const value = stackInput.value.trim();

    idStack.textContent =
        value || "YOUR STACK";
});


/* =========================================
   PHOTO
========================================= */

photoInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

        photoPlaceholder.innerHTML = "";

        const image = document.createElement("img");

        image.src = e.target.result;

        image.alt = "Builder photo";

        image.className = "builder-photo";

        photoPlaceholder.appendChild(image);
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

    const photo =
        document.querySelector(".builder-photo")?.src || null;


    const canvas = await createBuilderCanvas({
        name,
        stack,
        photo
    });


    /* Download */

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