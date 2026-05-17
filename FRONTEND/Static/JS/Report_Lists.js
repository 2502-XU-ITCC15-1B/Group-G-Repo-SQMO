const buttons = document.querySelectorAll(".report_btn, .ndreport_btn");

buttons.forEach(btn => {
    const key = btn.dataset.key;

    btn.addEventListener("click", () => {
        const link = localStorage.getItem(key);

        if (link) {
            window.open(link, "_blank");
        } else {
            alert("No file assigned yet.");
        }
    });
});


//for the zide barz
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
};

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

document.querySelectorAll("#menu a").forEach(link => {
    link.onclick = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };
});