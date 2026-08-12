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


    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        photoInput.value = "";

        return;
    }

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

/* =========================================
   SHARE ON X
========================================= */

const shareButton =
    document.querySelector(".share-button");

shareButton.addEventListener("click", async () => {

    const name =
        nameInput.value.trim();

    const stack =
        stackInput.value.trim();

    const caption =
        `Just built my Builder ID for Hacker House Goa 2026! 🌴⚡\n\n` +
        `#FrameInGoa`;

    const xUrl =
        "https://x.com/intent/tweet?text=" +
        encodeURIComponent(caption);

    const composeWindow =
        window.open("", "_blank");

    try {

        /* Generate the exact same Canvas */

        const canvas =
            await createBuilderCanvas({
                name,
                stack,
                photo: currentPhoto
            });


        /* Convert Canvas to PNG */

        const blob =
            await new Promise((resolve) => {
                canvas.toBlob(resolve, "image/png");
            });


        const file =
            new File(
                [blob],
                "hh-goa-builder-id.png",
                {
                    type: "image/png"
                }
            );


        /* =====================================
           NATIVE SHARE
           ===================================== */

        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [file]
            })
        ) {

            await navigator.share({
                files: [file],
                text: caption
            });

            if (composeWindow) {
                composeWindow.close();
            }

            return;
        }


        if (composeWindow) {
            composeWindow.location.href = xUrl;
            composeWindow.focus();
        } else {
            window.open(
                xUrl,
                "_blank",
                "noopener,noreferrer"
            );
        }

        const downloadUrl =
            URL.createObjectURL(blob);

        const downloadLink =
            document.createElement("a");

        downloadLink.href = downloadUrl;
        downloadLink.download = "hh-goa-builder-id.png";
        downloadLink.click();

        setTimeout(() => {
            URL.revokeObjectURL(downloadUrl);
        }, 4000);

    } catch (error) {

        /* User cancelled the native share sheet */

        if (error.name === "AbortError") {
            return;
        }

        console.error(
            "X sharing failed:",
            error
        );

        if (composeWindow) {
            composeWindow.close();
        }

        window.open(
            xUrl,
            "_blank",
            "noopener,noreferrer"
        );
    }
});