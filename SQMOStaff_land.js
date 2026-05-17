let isAdmin = false;

const programContainer = document.getElementById("programs");
const adminModeBtn = document.getElementById("adminModeBtn");

let programs = JSON.parse(localStorage.getItem("programs")) || [];

// ---------------------
// SAVE PROGRAMS
// ---------------------
function savePrograms() {
    localStorage.setItem("programs", JSON.stringify(programs));
}

// ---------------------
// RENDER PROGRAMS
// ---------------------
function renderPrograms() {

    programContainer.innerHTML = "";

    programs.forEach((program, index) => {

        const wrapper = document.createElement("div");
        wrapper.className = "program-wrapper";

        const btn = document.createElement("button");
        btn.className = "program_btn";
        btn.textContent = program.text;

        // OPEN REPORT PAGE (USER MODE ONLY)
        btn.onclick = () => {
            if (!isAdmin) {
                window.location.href = "SQMOStaff_report.html";
            }
        };

        wrapper.appendChild(btn);

        // ---------------------
        // ADMIN CONTROLS
        // ---------------------
        if (isAdmin) {

            const controls = document.createElement("div");
            controls.className = "controls";

            // EDIT BUTTON
            const editBtn = document.createElement("button");
            editBtn.className = "editBtn";
            editBtn.textContent = "Edit";

            editBtn.onclick = () => {
                const newName = prompt("Edit Program:", program.text);
                if (!newName) return;

                programs[index].text = newName;

                savePrograms();
                renderPrograms();
            };

            // DELETE BUTTON
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "deleteBtn";
            deleteBtn.textContent = "X";

            deleteBtn.onclick = () => {
                programs.splice(index, 1);

                savePrograms();
                renderPrograms();
            };

            controls.appendChild(editBtn);
            controls.appendChild(deleteBtn);

            wrapper.appendChild(controls);
        }

        programContainer.appendChild(wrapper);
    });

    // ---------------------
    // ADD PROGRAM BUTTON (ADMIN ONLY)
    // ---------------------
    if (isAdmin) {

        const addWrapper = document.createElement("div");
        addWrapper.className = "program-wrapper";

        const addBtn = document.createElement("button");
        addBtn.className = "program_btn";
        addBtn.textContent = "+ ADD PROGRAM";

        addBtn.onclick = () => {

            const name = prompt("Program Name:");
            if (!name) return;

            programs.push({ text: name });

            savePrograms();
            renderPrograms();
        };

        addWrapper.appendChild(addBtn);
        programContainer.appendChild(addWrapper);
    }
}

// ---------------------
// ADMIN TOGGLE
// ---------------------
function toggleAdmin() {
    isAdmin = !isAdmin;

    adminModeBtn.textContent =
        isAdmin ? "User Mode" : "Admin Mode";

    renderPrograms();
}

// ---------------------
// SIDEBAR (if exists in page)
// ---------------------
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn && sidebar && overlay) {
    menuBtn.onclick = () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    };

    overlay.onclick = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };
}

// ---------------------
// ADMIN BUTTON
// ---------------------
if (adminModeBtn) {
    adminModeBtn.onclick = (e) => {
        e.preventDefault();
        toggleAdmin();
    };
}

// ---------------------
// INIT
// ---------------------
renderPrograms();