const programContainer = document.getElementById("programs");

let programs = JSON.parse(localStorage.getItem("programs")) || [];

function renderPrograms() {

    programContainer.innerHTML = "";

    programs.forEach((p) => {

        const wrapper = document.createElement("div");
        wrapper.className = "program-wrapper";

        const btn = document.createElement("button");
        btn.className = "program_btn";
        btn.textContent = p.text;

        btn.onclick = () => {
            window.location.href = "Login_Page.html";
        };

        wrapper.appendChild(btn);

        programContainer.appendChild(wrapper);
    });
}

renderPrograms();