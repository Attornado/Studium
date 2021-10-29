var slideIndex = 1,slides,dots,captionText, descrip=[
        "Studium is a site aimed at offering and organizing a series of professional training courses. Each course is taught by a specialist of the sector, and organized into a series of lessons that are held throughout the year. You can purchase one or more courses to earn the right to participate. At the end of participation in the course, an exam must be taken, after which a certificate with user data will be delivered."
        ,"Hi, I’m Roberto Esposito, a young student of University of Salerno. Since I was a child my main interests were Computer science and everything that involved into the IT field. I’m from Scafati and I studied for my high school diploma in the school of my city."
        ,"I'm Francesco Mattina, a student of the University of Salerno, and graduating in computer science. I was born in Naples but have lived in Caserta since I was a child. Over time I developed interest in the computer sciences that led me to choose a specific university career. I graduated from a scientific high school in the city where I live."
        ,"Hi, I'm Andrea Terlizzi, currently, I'm a Computer Science student in Università degli Studi di Salerno, in Italy, and I'm in the second year of studies. My interest include almost any field of the discrete or continuum mathematics that has any application in computation(such as graphs, Galois fields and so on), low and high level programming languages, operating systems, some back-end developing(including database design), data science & machine learning, and, more than anything else, theoretical computer science subjects, such as Automata Theory, Algorithms & Data Structures design and analisys and Computation Theory in general."];
function initGallery(){
    slides=document.getElementsByClassName("imageHolder");
    captionText=document.querySelector(".captionHolder .captionText");
    captionText.innerText=slides[slideIndex-1].querySelector(".captionText").innerText;
    $(".descriptionText").text(descrip[slideIndex-1]);
}
initGallery();
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var slideTextAnimClass;
    var i;
     slides = document.getElementsByClassName("imageHolder");
     dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    slideTextAnimClass="slideTextFromBottom";
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.style.display="none";
    captionText.className="captionText "+slideTextAnimClass;
    captionText.innerText=slides[slideIndex-1].querySelector(".captionText").innerText;
    captionText.style.display="block";
    $(".descriptionText").text(descrip[slideIndex-1]);
}