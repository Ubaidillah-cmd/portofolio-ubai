document.addEventListener("DOMContentLoaded", function () {

    // ===== Typing Effect =====
    const text = "Web Developer | UI Designer | Tech Enthusiast";
    let index = 0;
    const typingElement = document.querySelector(".typing-text");

    function typeEffect() {
        if (typingElement && index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 80);
        }
    }

    typeEffect();

    // ===== Active Navbar =====
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // ===== Hamburger Toggle =====
   document.addEventListener("DOMContentLoaded", () => {

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

/* Close menu ketika klik link */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

/* Klik di luar menu */
document.addEventListener("click", (e) => {

    if(
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target)
    ){
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }

});

});

    // ===== skills =====
    const skillsSection = document.querySelector(".skills");
    const progressBars = document.querySelectorAll(".progress-bar");
    const circles = document.querySelectorAll(".circle");

    let started = false;

    function showSkills(){

        if(started) return;
        started = true;

        progressBars.forEach(bar=>{
            const value = bar.dataset.progress;
            bar.style.width = value + "%";
        });

        circles.forEach(circle=>{

            const percent = circle.dataset.percent;
            const progressCircle = circle.querySelector(".progress-circle");
            const text = circle.querySelector(".circle-text");

            const radius = 50;
            const circumference = 2 * Math.PI * radius;

            progressCircle.style.strokeDasharray = circumference;

            const offset = circumference - (percent/100)*circumference;

            progressCircle.style.strokeDashoffset = offset;

            /* Counting Animation */

            let count = 0;

                const interval = setInterval(()=>{

                    if(count >= percent){
                        clearInterval(interval);
                    }else{
                        count++;
                        text.innerText = count + "%";
                    }

                },20);

        });

    }

    window.addEventListener("scroll", ()=>{

        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight * 0.8;

        if(sectionPos < screenPos){
            showSkills();
        }

    });

    window.addEventListener("scroll", ()=>{

        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight * 0.8;

        if(sectionPos < screenPos){
            showSkills();
        }

    });

    

});

