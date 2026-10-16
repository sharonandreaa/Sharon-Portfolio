
const factCards = document.querySelectorAll(".fact-card");

factCards.forEach(function(card) {

    // TOPPLE WHEN THE CURSOR MOVES

    card.addEventListener("pointermove", function(event) {

        if (event.pointerType !== "mouse" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const rectangle = card.getBoundingClientRect();

        const cursorX = event.clientX - rectangle.left;

        const centerX = rectangle.width / 2;

        const position = (cursorX - centerX) / centerX;

        const rotation = position * 7;

        card.style.setProperty("--rotate-z", rotation + "deg");
        card.style.setProperty("--rotate-y", rotation * 0.7 + "deg");

    });


    // RETURN TO ORIGINAL POSITION

    card.addEventListener("pointerleave", function() {

        card.style.setProperty("--rotate-z", "0deg");
        card.style.setProperty("--rotate-y", "0deg");

    });


    // SAME! BUBBLE INTERACTION

    card.addEventListener("click", function() {

        card.classList.toggle("selected");

        const isSelected = card.classList.contains("selected");

        card.setAttribute("aria-pressed", isSelected);

    });

});


// LEARNING CURVE - MOVING DESTINATION LIGHT

const timeline = document.querySelector(".learning-timeline");

const timelineItems = document.querySelectorAll(".timeline-item");

function moveTimelineLight(item) {

    // Find the numbered circle for this milestone
    const circle = item.querySelector(".timeline-number");

    // Measure the timeline and the circle
    const timelineRect = timeline.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();

    // Find the circle's centre relative to the timeline
    const destination =
        circleRect.top + circleRect.height / 2 - timelineRect.top;

    // Move the light to that destination
    timeline.style.setProperty(
        "--light-position",
        destination + "px"
    );

    // Highlight the hovered milestone
    timelineItems.forEach(function(timelineItem) {
        timelineItem.classList.remove("active");
    });

    item.classList.add("active");
}

// Move the light whenever a milestone is hovered
timelineItems.forEach(function(item) {

    item.addEventListener("mouseenter", function() {
        moveTimelineLight(item);
    });

});

// Start the light at milestone 01
if (timelineItems.length > 0) {
    moveTimelineLight(timelineItems[0]);
}



// =====================================
// ACTIVE NAVIGATION SECTION
// =====================================

const navLinks = document.querySelectorAll(".nav-link");

const portfolioSections = document.querySelectorAll(
    "#home, #about, #interests, #facts, #learning, #contact"
);

function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 180;

    portfolioSections.forEach(function(section) {

        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

window.addEventListener("load", updateActiveNavigation);



// =====================================
// STEP 4 - SCROLL REVEAL
// =====================================

// Select the content we want to animate

const revealElements = document.querySelectorAll(
    "#about .about-heading, " +
    "#about .about-content, " +
    "#interests h2, " +
    "#interests .interest-item, " +
    "#facts h2, " +
    "#facts .facts-subtitle, " +
    
    "#learning h2, " +
    "#learning .learning-subtitle, " +
    "#contact h2, " +
    "#contact .contact-subtitle, " +
    "#contact .contact-link"
);

// Enable animation styles only after elements are found

document.documentElement.classList.add("js-enabled");

// Add reveal class to selected elements

revealElements.forEach(function(element, index) {

    element.classList.add("reveal");

    // Small stagger for nearby elements
    element.classList.add("delay-" + (index % 4));

});

// Watch when elements enter the viewport

const revealObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                // Reveal only once
                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

// Start observing

revealElements.forEach(function(element) {
    revealObserver.observe(element);
});



