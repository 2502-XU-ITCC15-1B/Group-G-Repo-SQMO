let isAdmin = false;

const adminToggle = document.getElementById("adminToggle");
const addBtn = document.getElementById("addBtn");
const programContainer = document.getElementById("programs");


let programs = JSON.parse(localStorage.getItem("programs")) || [
    { id: 1, text: "BS IT", link: "SQMOStaff_report.html" },
    { id: 2, text: "Agriculture", link: "SQMOStaff_report.html" },
    { id: 3, text: "BS Devcom", link: "SQMOStaff_report.html" },
    { id: 4, text: "PHD", link: "SQMOStaff_report.html" },
    { id: 5, text: "SHS", link: "SQMOStaff_report.html" },
    { id: 6, text: "JHS", link: "SQMOStaff_report.html" }
];


programs = programs.map(p => ({
    ...p,
    link: "SQMOStaff_report.html"
}));
saveData();

function saveData() {
    localStorage.setItem("programs", JSON.stringify(programs));
}

function render() {
    programContainer.innerHTML = "";

    programs.forEach((p, index) => {

        const wrapper = document.createElement("div");
        wrapper.className = "program-wrapper";

        const btn = document.createElement("button");
        btn.className = "program_btn";
        btn.textContent = p.text;

        // ✅ ALWAYS GO TO SQMOStaff_report.html
        btn.onclick = () => {
            if (!isAdmin) {
                window.location.href = "SQMOStaff_report.html";
            }
        };

        wrapper.appendChild(btn);

        // ADMIN CONTROLS
        if (isAdmin) {
            const controls = document.createElement("div");
            controls.className = "controls";

            // EDIT
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "editBtn";

            editBtn.onclick = () => {
                const newText = prompt("Edit text:", p.text);
                if (newText) {
                    programs[index].text = newText;
                    saveData();
                    render();
                }
            };

            // DELETE
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.className = "deleteBtn";

            deleteBtn.onclick = () => {
                programs.splice(index, 1);
                saveData();
                render();
            };

            controls.appendChild(editBtn);
            controls.appendChild(deleteBtn);
            wrapper.appendChild(controls);
        }

        programContainer.appendChild(wrapper);
    });
}

// ADMIN TOGGLE
adminToggle.onclick = () => {
    isAdmin = !isAdmin;
    adminToggle.textContent = isAdmin ? "Edit: ON" : "Edit: OFF";
    addBtn.style.display = isAdmin ? "inline-block" : "none";
    render();
};

// ADD PROGRAM
addBtn.onclick = () => {
    const name = prompt("Program name:");
    if (!name) return;

    programs.push({
        id: Date.now(),
        text: name,
        link: "SQMOStaff_report.html"
    });

    saveData();
    render();
};

// LOGOUT
function logout() {
    window.location.href = "Landing_Page.html";
}

// INIT
render();