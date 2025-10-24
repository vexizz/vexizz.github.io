const container = document.querySelector(".container"); 
const items = document.querySelector(".items");
const indicator = document.querySelector(".indicator");
const itemElements = document.querySelectorAll(".item");
const previewImage = document.querySelector(".img-preview img");
const itemImages = document.querySelectorAll(".item img");

let isHorizontal = window.innerWidth <= 900; /* I'm setting up some initial variables, and am using a flag to check if the screen width is less than or equal to 900 pixels which will help the site switch to a horizontal layout for mobile devies.*/
let dimensions = {
    itemSize: 0,
    containerSize: 0, /* I am also defining an object to store the dimensions of the minimap items in order to keep it consistent and professional, including the container and the indicator, and these will be updated dynamically based on the screen size, making it more responsive and usable for a large group of people. This is much simpler than having to manually set the width and height of each, which also will be risky since it'll be hard to calculate all.*/
    indicatorSize: 0,
};

let maxTranslate = 0; /* I am now setting up vairables to handle the scrolling behaviour and active image tracking.*/
let currentTranslate = 0;
let targetTranslate = 0; /* These control how far the minimap can move and where it should go next, making sure it doesn't max out and glitch unprofessionally.*/
let isClickMove = false; /* This checks if the movement was triggered by a click while the current image index keeps track of the active image.*/
let currentImageIndex = 0;
const activeItemOpacity = 0.3; /* I also added very slight opacity to visually highlight the selected item, communicating to the users how they're interacting with the scroll feature, and encouraging them to proceed.*/

function lerp(start, end, factor) { /* To handle smooth transitions between positions, I've added a linear interpolation function, where it gradually moves from a start value to an end value between 0 and 1, helping to create smooth natural scrolling effects, and animations as the minimap moves or while switching images.*/
    return start + (end - start) * factor;
}

function updateDimensions() { /* I am setting up the update Dimensions function to manage the responsive behaviour of the scrolling minimap, checking the screen width to determine whether the minimap should be displayed vertically or horizontally.*/
    isHorizontal = window.innerWidth <= 900;
    if (isHorizontal) {
        dimensions = {
            itemSize: itemElements[0].getBoundingClientRect().width,
            containerSize: items.scrollWidth,
            indicatorSize: indicator.getBoundingClientRect().width,
        };
    } else {
        dimensions = {
            itemSize: itemElements[0].getBoundingClientRect().height,
            containerSize: items.getBoundingClientRect().height,
            indicatorSize: indicator.getBoundingClientRect().height,
        };
    }
    return dimensions;
} /* The values of the screen width and making sure that the minimap's display is corrent is very crucial in enuring it can scroll smoothly and that the indicator can correctly highlight the selected item. By calculating each size of the elements, this allows the scrolling minimap to adjust seamlessly between vertical and horizontal orientations, depending on the screen size.*/

dimensions = updateDimensions();
maxTranslate = dimensions.containerSize - dimensions.indicatorSize; /* This defines the maximum distance the minimap can scroll.*/

function getItemInIndicator() {
    itemImages.forEach((img) => (img.style.opacity = 1)); /* The opacity of all minimap images is decided to make sure none of the previous selections stay highlighted.*/

    const indicatorStart = -currentTranslate; /* Calculating where the indicator starts and ends based on the current scrolling position.*/
    const indicatorEnd = indicatorStart + dimensions.indicatorSize; /* We go through each minimap item to check how much it overlaps with the indicator, and the item with the most overlapped will be the one we select. This allows for smooth and continuous scrolling without any awkward pauses.*/

    let maxOverlap = 0;
    let selectedIndex = 0;

    itemElements.forEach((item, index) => {
        const itemStart = index * dimensions.itemSize;
        const itemEnd = itemStart + dimensions.itemSize; /* Once we've identified the selected item, we'll reduce its opacity to highlight it visually giving a clear indication of which image is active and how far in you are through the scroll.*/

        const overlapStart = Math.max(indicatorStart, itemStart);
        const overlapEnd = Math.min(indicatorEnd, itemEnd);
        const overlap = Math.max(0, overlapEnd - overlapStart);

        if (overlap > maxOverlap) { /* By continuously updating the main preview image, this ensures that the indicator doesn't scroll beyond the last item.*/
            maxOverlap = overlap;
            selectedIndex = index;
        }
    });

    itemImages[selectedIndex].style.opacity = activeItemOpacity;
    return selectedIndex;
}

function updatePreviewImage(index) {
    if (currentImageIndex !== index) {
        currentImageIndex = index;
        const targetItem = itemElements[index].querySelector("img");
        const targetSrc = targetItem.getAttribute ("src");
        previewImage.setAttribute("src", targetSrc); /* This ensures that the preview always matches the image highlighted and updates throughout your scroll in real-time seamlessly in the minimap.*/
    }
}

function animate() { 
    const lerpFactor = isClickMove ? 0.05 : 0.075; /* We'll first set the lerp factor whichwill control how smooth the scrolling feels.*/
    currentTranslate = lerp(currentTranslate, targetTranslate, lerpFactor); /* If the selection was scrolled through instead of a click, we'll use a slightly faster factor for a less controlled animation, opting for a smooth and seamlessly continous flow, keeping the motion fluid.*/

    if (Math.abs(currentTranslate - targetTranslate) > 0.01) { /* We'll update the current translate by using the function to gradually move from the current position to the target position, creating that smooth natural scrolling effect.*/
        const transform = isHorizontal
            ? `translateX(${currentTranslate}px)` /* This is for the mobile horizontal display, where the scrolling minimap travels across the X-axis.*/
            : `translateY(${currentTranslate}px)`;
        items.style.transform = transform;

        const activeIndex = getItemInIndicator();
        updatePreviewImage(activeIndex);
    } else {
        isClickMove = false;
    }

    requestAnimationFrame(animate); /* It will call the request animation frame function to keep the scrolling animation running smoothly all throughout, creating a continuous loop that updates the minimap's position in realtime.*/
}

container.addEventListener(
    "wheel",
    (e) => {
        e.preventDefault();
        isClickMove = false;

        let delta;
        delta = e.deltaY;

        const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);

        targetTranslate = Math.min(
            Math.max(targetTranslate - scrollVelocity, -maxTranslate),
            0
        );
    },
    { passive: false }
);

lettouchStartY = 0;
container.addEventListener("touchstart", (e) => {
    if(isHorizontal) {
        touchStartY = e.touch[0].clientY;
    }
});

container.addEventListener("touchmove", (e) => {
    if (isHorizontal) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;

        const delta = deltaY;
        const scrollVelocity = Math.min(Math.max(delta * 0.5, -20,), 20);

        targetTranslate = Math.min(
            Math.max(targetTranslate - scrollVelocity, -maxTranslate),
            0
        );

        touchStartY = touchY;
        e.preventDefault();
    }
  }, 
  {passive: false}
);

itemElements.forEach((item, index) => {
    item.addEventListener("click", () => {
        isClickMove = true;
        targetTranslate = -index * dimensions.itemSize + (dimensions.indicatorSize -dimensions.itemSize) / 2;

    targetTranslate = Math.max(Math.min(targetTranslate, 0), -maxTranslate);
  });
});

window.addEventListener("resize", () => {
    dimensions = updateDimensions();
    const newMaxTranslate = dimensions.containerSize - dimensions.indicatorSize;

    targetTranslate = Math.min(Math.max(targetTranslate, -newMaxTranslate), 0);
    currentTranslate = targetTranslate;

    const transform = isHorizontal ? `translateX(${currentTranslate}px)`
        : `translateY(${currentTranslate}px)`;
    items.style.transform = transform;
});

const menuButton = document.getElementById("menu-button");
menuButton.addEventListener("click", () => {
  location.reload();
});

itemImages[0].style.opacity = activeItemOpacity;
updatePreviewImage(0);
animate();