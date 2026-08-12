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

ctx.font = "bold 42px monospace";

ctx.fillText(
    "HH / GOA",
    65,
    95
);


/* Builder label */

ctx.fillStyle = yellow;

ctx.font = "bold 38px monospace";

ctx.fillText(
    "BUILDER",
    865,
    95
);


/* Year */

ctx.fillStyle = cream;

ctx.font = "bold 24px monospace";

ctx.fillText(
    "2026",
    1025,
    135
);


/* Small ID marker */

ctx.fillStyle = yellow;

ctx.font = "bold 20px monospace";

ctx.fillText(
    "ID / 001",
    65,
    140
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
/* PHOTO FRAME */

ctx.strokeStyle = ink;
ctx.lineWidth = 5;

ctx.strokeRect(
    photoX,
    photoY,
    photoW,
    photoH
);

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

    /* =========================================
       DECORATIVE TROPICAL ELEMENTS
    ========================================= */

    // Small sun

    ctx.beginPath();

    ctx.arc(
        1030,
        260,
        55,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = yellow;

    ctx.fill();


    // Sun rays

    ctx.strokeStyle = yellow;

    ctx.lineWidth = 3;

    for (let i = 0; i < 8; i++) {

        const angle =
            (Math.PI * 2 / 8) * i;

        const x1 =
            1030 + Math.cos(angle) * 75;

        const y1 =
            260 + Math.sin(angle) * 75;

        const x2 =
            1030 + Math.cos(angle) * 95;

        const y2 =
            260 + Math.sin(angle) * 95;

        ctx.beginPath();

        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);

        ctx.stroke();
    }


    /* =========================================
       TROPICAL LEAVES
    ========================================= */

    drawLeaf(
        ctx,
        120,
        250,
        180,
        -0.7,
        "#4F8F45"
    );

    drawLeaf(
        ctx,
        1030,
        720,
        160,
        0.6,
        "#78A942"
    );

    drawLeaf(
        ctx,
        170,
        820,
        120,
        0.4,
        "#0D7048"
    );


    /* =========================================
   NAME
========================================= */

/* Small label */

ctx.fillStyle = coral;

ctx.font =
    "bold 16px monospace";

ctx.fillText(
    "BUILDER",
    90,
    1130
);


/* Main name */

ctx.fillStyle = ink;

/* =========================================
   MAIN NAME
========================================= */

ctx.fillStyle = ink;

let nameText = name || "YOUR NAME";

let nameSize = 76;

const maxNameWidth = 1020;


/* Automatically shrink long names */

ctx.font =
    `bold ${nameSize}px Georgia, serif`;

while (
    ctx.measureText(nameText).width > maxNameWidth &&
    nameSize > 38
) {

    nameSize -= 2;

    ctx.font =
        `bold ${nameSize}px Georgia, serif`;
}


ctx.fillText(
    nameText,
    90,
    1190
);


/* Small underline */

ctx.fillStyle = yellow;

ctx.fillRect(
    90,
    1210,
    130,
    6
);


    /* =========================================
   STACK / BUILDS WITH
========================================= */

/* Label */

ctx.fillStyle = coral;

ctx.font =
    "bold 17px monospace";

ctx.fillText(
    "BUILDS WITH",
    90,
    1255
);


/* =========================================
   STACK
========================================= */

ctx.fillStyle = green;

let stackText =
    (stack || "YOUR STACK").toUpperCase();

let stackSize = 34;

const maxStackWidth = 1020;

ctx.font =
    `bold ${stackSize}px monospace`;


/* Automatically shrink long stacks */

while (
    ctx.measureText(stackText).width > maxStackWidth &&
    stackSize > 18
) {

    stackSize -= 2;

    ctx.font =
        `bold ${stackSize}px monospace`;
}


ctx.fillText(
    stackText,
    90,
    1300
);

    /* =========================================
       DIVIDER
    ========================================= */

    ctx.fillStyle = ink;

    ctx.fillRect(
        90,
        1370,
        1020,
        4
    );


    /* =========================================
       BUILDER INFO
    ========================================= */

    ctx.fillStyle = green;

    ctx.font =
        "500 22px monospace";

    ctx.fillText(
        "BUILDER / GOA / INDIA",
        90,
        1345
    );


    /* =========================================
       YEAR BADGE
    ========================================= */

    ctx.fillStyle = yellow;

    ctx.fillRect(
        930,
        1380,
        180,
        85
    );


    ctx.fillStyle = ink;

    ctx.font =
        "bold 40px monospace";

    ctx.fillText(
        "HH 26",
        960,
        1435
    );


    /* =========================================
       COORDINATES
    ========================================= */

    ctx.fillStyle = green;

    ctx.font =
        "500 20px monospace";

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


    /* =========================================
       SMALL FOOTER TEXT
    ========================================= */

    ctx.fillStyle = coral;

    ctx.font =
        "bold 16px monospace";

    ctx.fillText(
        "#FRAMEINGOA",
        90,
        1725
    );
}

function drawLeaf(
    ctx,
    x,
    y,
    size,
    rotation,
    color
) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(rotation);

    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.quadraticCurveTo(
        size * 0.45,
        -size * 0.35,
        size,
        0
    );

    ctx.quadraticCurveTo(
        size * 0.45,
        size * 0.35,
        0,
        0
    );

    ctx.fillStyle = color;

    ctx.fill();


    /* Leaf vein */

    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.lineTo(size, 0);

    ctx.strokeStyle = "#F5EFD9";

    ctx.lineWidth = 3;

    ctx.globalAlpha = 0.45;

    ctx.stroke();

    ctx.restore();
}