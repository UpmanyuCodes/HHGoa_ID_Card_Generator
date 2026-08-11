/* =========================================
   BUILDER ID CANVAS
========================================= */

async function createBuilderCanvas({
    name,
    stack,
    photo
}) {

    const canvas = document.createElement("canvas");

    canvas.width = 1200;
    canvas.height = 1765;

    const ctx = canvas.getContext("2d");


    /* -----------------------------------------
       COLORS
    ----------------------------------------- */

    const cream = "#F5EFD9";
    const green = "#063B2B";
    const forest = "#0D7048";
    const yellow = "#F4C542";
    const coral = "#F06A4F";
    const ink = "#071B13";


    /* -----------------------------------------
       BACKGROUND
    ----------------------------------------- */

    ctx.fillStyle = cream;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* -----------------------------------------
       GREEN HEADER
    ----------------------------------------- */

    ctx.fillStyle = green;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        470
    );


    /* -----------------------------------------
       TROPICAL CIRCLE
    ----------------------------------------- */

    ctx.beginPath();

    ctx.arc(
        950,
        120,
        250,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = forest;

    ctx.fill();


    /* -----------------------------------------
       HEADER TEXT
    ----------------------------------------- */

    ctx.fillStyle = cream;

    ctx.font = "500 30px monospace";

    ctx.fillText(
        "HH / GOA",
        70,
        85
    );

    ctx.fillStyle = yellow;

    ctx.fillText(
        "BUILDER",
        920,
        85
    );


    /* -----------------------------------------
       PHOTO FRAME
    ----------------------------------------- */

    const photoX = 90;
    const photoY = 190;
    const photoW = 1020;
    const photoH = 850;


    /* Shadow */

    ctx.fillStyle = ink;

    ctx.fillRect(
        photoX + 20,
        photoY + 20,
        photoW,
        photoH
    );


    /* Photo background */

    ctx.fillStyle = forest;

    ctx.fillRect(
        photoX,
        photoY,
        photoW,
        photoH
    );


    /* -----------------------------------------
       LOAD & DRAW PHOTO
    ----------------------------------------- */

    if (photo) {

        const image = await loadImage(photo);

        drawCoverImage(
            ctx,
            image,
            photoX,
            photoY,
            photoW,
            photoH
        );
    }


    /* -----------------------------------------
       CARD INFORMATION
    ----------------------------------------- */

    drawCardInformation(
        ctx,
        name,
        stack,
        cream,
        green,
        yellow,
        coral,
        ink
    );


    return canvas;
}


/* =========================================
   LOAD IMAGE
========================================= */

function loadImage(src) {

    return new Promise((resolve, reject) => {

        const image = new Image();

        image.onload = () => {
            resolve(image);
        };

        image.onerror = () => {
            reject(
                new Error("Could not load builder photo.")
            );
        };

        image.src = src;
    });
}


/* =========================================
   COVER IMAGE
========================================= */

function drawCoverImage(
    ctx,
    image,
    x,
    y,
    width,
    height
) {

    const imageRatio =
        image.width / image.height;

    const boxRatio =
        width / height;

    let sourceWidth;
    let sourceHeight;
    let sourceX;
    let sourceY;


    if (imageRatio > boxRatio) {

        sourceHeight = image.height;

        sourceWidth =
            image.height * boxRatio;

        sourceX =
            (image.width - sourceWidth) / 2;

        sourceY = 0;

    } else {

        sourceWidth = image.width;

        sourceHeight =
            image.width / boxRatio;

        sourceX = 0;

        sourceY =
            (image.height - sourceHeight) / 2;
    }


    ctx.drawImage(
        image,

        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,

        x,
        y,
        width,
        height
    );
}


/* =========================================
   CARD INFORMATION
========================================= */

function drawCardInformation(
    ctx,
    name,
    stack,
    cream,
    green,
    yellow,
    coral,
    ink
) {

    /* -----------------------------------------
       NAME
    ----------------------------------------- */

    ctx.fillStyle = ink;

    ctx.font = "bold 70px serif";

    ctx.fillText(
        name || "YOUR NAME",
        90,
        1170
    );


    /* -----------------------------------------
       STACK
    ----------------------------------------- */

    ctx.fillStyle = green;

    ctx.font = "500 28px monospace";

    ctx.fillText(
        (stack || "YOUR STACK").toUpperCase(),
        90,
        1230
    );


    /* -----------------------------------------
       LINE
    ----------------------------------------- */

    ctx.fillStyle = ink;

    ctx.fillRect(
        90,
        1270,
        1020,
        4
    );


    /* -----------------------------------------
       BUILDER
    ----------------------------------------- */

    ctx.fillStyle = green;

    ctx.font = "500 24px monospace";

    ctx.fillText(
        "BUILDER / GOA / INDIA",
        90,
        1335
    );


    /* -----------------------------------------
       YEAR
    ----------------------------------------- */

    ctx.fillStyle = coral;

    ctx.font = "bold 90px serif";

    ctx.fillText(
        "26",
        950,
        1450
    );


    /* -----------------------------------------
       FOOTER
    ----------------------------------------- */

    ctx.fillStyle = green;

    ctx.font = "500 22px monospace";

    ctx.fillText(
        "15°29'N",
        90,
        1680
    );

    ctx.fillText(
        "74°07'E",
        930,
        1680
    );
}