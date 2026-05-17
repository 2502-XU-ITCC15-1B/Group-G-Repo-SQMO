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

const usernameAccreditor = document.getElementById("usernameAccreditor");
const programSelect = document.getElementById("programSelect");
const addAccountBtnAccreditor = document.getElementById("addAccountBtnAccreditor");
const accountListAccreditor = document.getElementById("accountListAccreditor");

let accountsAccreditor = JSON.parse(localStorage.getItem("accountsAccreditor")) || [];

function saveAccountsAccreditor() {
    localStorage.setItem("accountsAccreditor", JSON.stringify(accountsAccreditor));
}

function renderAccountsAccreditor() {
    accountListAccreditor.innerHTML = "";
    accountsAccreditor.forEach((acc, index) => {
        const li = document.createElement("li");
        li.textContent = `${acc.username} - ${acc.program}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => {
            accountsAccreditor.splice(index, 1);
            saveAccountsAccreditor();
            renderAccountsAccreditor();
        };
        li.appendChild(deleteBtn);
        accountListAccreditor.appendChild(li);
    });
}

function loadProgramsToSelect() {
    const programs = JSON.parse(localStorage.getItem("programs")) || [];
    programSelect.innerHTML = "";
    programs.forEach(program => {
        const option = document.createElement("option");
        option.value = program.text;
        option.textContent = program.text;
        programSelect.appendChild(option);
    });
}

loadProgramsToSelect();
window.addEventListener("storage", (e) => {
    if (e.key === "programs") loadProgramsToSelect();
});

addAccountBtnAccreditor.onclick = () => {
    const username = usernameAccreditor.value.trim();
    const program = programSelect.value;
    if (!username || !program) return;
    accountsAccreditor.push({ username, program });
    saveAccountsAccreditor();
    renderAccountsAccreditor();
    usernameAccreditor.value = "";
};

renderAccountsAccreditor();

const usernameSQMO = document.getElementById("usernameSQMO");
const addAccountBtnSQMO = document.getElementById("addAccountBtnSQMO");
const accountListSQMO = document.getElementById("accountListSQMO");

let accountsSQMO = JSON.parse(localStorage.getItem("accountsSQMO")) || [];

function saveAccountsSQMO() {
    localStorage.setItem("accountsSQMO", JSON.stringify(accountsSQMO));
}

function renderAccountsSQMO() {
    accountListSQMO.innerHTML = "";
    accountsSQMO.forEach((acc, index) => {
        const li = document.createElement("li");
        li.textContent = `${acc.username} - SQMO`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => {
            accountsSQMO.splice(index, 1);
            saveAccountsSQMO();
            renderAccountsSQMO();
        };
        li.appendChild(deleteBtn);
        accountListSQMO.appendChild(li);
    });
}

addAccountBtnSQMO.onclick = () => {
    const username = usernameSQMO.value.trim();
    if (!username) return;
    accountsSQMO.push({ username });
    saveAccountsSQMO();
    renderAccountsSQMO();
    usernameSQMO.value = "";
};

renderAccountsSQMO();