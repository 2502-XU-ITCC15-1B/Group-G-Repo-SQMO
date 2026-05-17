/* ── Sidebar ── */
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

/* ── Helpers ── */
function getInitials(email) {
    const local = email.split("@")[0];
    const parts = local.split(/[._-]/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return local.slice(0, 2).toUpperCase();
}

function maybeShowEmpty(ul) {
    if (!ul.querySelector(".account-item")) {
        ul.innerHTML = `<li class="empty-state"><div class="empty-icon">📭</div>No accounts yet</li>`;
    }
}

function clearEmpty(ul) {
    const empty = ul.querySelector(".empty-state");
    if (empty) empty.remove();
}

/* ── Accreditors ── */
const usernameAccreditor    = document.getElementById("usernameAccreditor");
const programSelect         = document.getElementById("programSelect");
const addAccountBtnAccreditor = document.getElementById("addAccountBtnAccreditor");
const accountListAccreditor = document.getElementById("accountListAccreditor");

let accountsAccreditor = JSON.parse(localStorage.getItem("accountsAccreditor")) || [];

function saveAccountsAccreditor() {
    localStorage.setItem("accountsAccreditor", JSON.stringify(accountsAccreditor));
}

function createAccountItem(acc, index, type) {
    const isAccreditor = type === "accreditor";
    const tag      = isAccreditor ? (acc.program || "Accreditor") : "SQMO";
    const tagClass = isAccreditor ? "tag-accreditor" : "tag-sqmo";
    const avatarClass = isAccreditor ? "" : "gold-av";

    const li = document.createElement("li");
    li.className = "account-item";
    li.innerHTML = `
        <div class="avatar ${avatarClass}">${getInitials(acc.username)}</div>
        <span class="account-email" title="${acc.username}">${acc.username}</span>
        <span class="account-tag ${tagClass}">${tag}</span>
        <button class="btn-remove" title="Remove account">✕</button>
    `;

    li.querySelector(".btn-remove").onclick = () => {
        if (isAccreditor) {
            accountsAccreditor.splice(index, 1);
            saveAccountsAccreditor();
            renderAccountsAccreditor();
        } else {
            accountsSQMO.splice(index, 1);
            saveAccountsSQMO();
            renderAccountsSQMO();
        }
    };

    return li;
}

let sortAccreditor = "none"; // "none" | "asc" | "desc"

function getSorted(arr, direction) {
    if (direction === "none") return arr.map((acc, i) => ({ acc, i }));
    return arr
        .map((acc, i) => ({ acc, i }))
        .sort((a, b) => {
            const cmp = a.acc.username.localeCompare(b.acc.username, undefined, { sensitivity: "base" });
            return direction === "asc" ? cmp : -cmp;
        });
}

function renderAccountsAccreditor() {
    accountListAccreditor.innerHTML = "";
    if (accountsAccreditor.length === 0) {
        maybeShowEmpty(accountListAccreditor);
        return;
    }
    getSorted(accountsAccreditor, sortAccreditor).forEach(({ acc, i }) => {
        accountListAccreditor.appendChild(createAccountItem(acc, i, "accreditor"));
    });
}

function loadProgramsToSelect() {
    const programs = JSON.parse(localStorage.getItem("programs")) || [];
    programSelect.innerHTML = `<option value="" disabled selected>Program</option>`;
    if (programs.length === 0) {
        const fallback = ["BSCS", "BSIT", "BSEE", "BSME", "BSN"];
        fallback.forEach(p => {
            const option = document.createElement("option");
            option.value = p;
            option.textContent = p;
            programSelect.appendChild(option);
        });
    } else {
        programs.forEach(program => {
            const option = document.createElement("option");
            option.value = program.text;
            option.textContent = program.text;
            programSelect.appendChild(option);
        });
    }
}

loadProgramsToSelect();
renderAccountsAccreditor();

window.addEventListener("storage", (e) => {
    if (e.key === "programs") loadProgramsToSelect();
    if (e.key === "accountsAccreditor") {
        accountsAccreditor = JSON.parse(e.newValue) || [];
        renderAccountsAccreditor();
    }
    if (e.key === "accountsSQMO") {
        accountsSQMO = JSON.parse(e.newValue) || [];
        renderAccountsSQMO();
    }
});

addAccountBtnAccreditor.onclick = () => {
    const username = usernameAccreditor.value.trim();
    const program  = programSelect.value;
    if (!username) { usernameAccreditor.focus(); return; }
    if (!program)  { programSelect.focus(); return; }
    accountsAccreditor.push({ username, program });
    saveAccountsAccreditor();
    renderAccountsAccreditor();
    usernameAccreditor.value = "";
    programSelect.selectedIndex = 0;
};

usernameAccreditor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addAccountBtnAccreditor.click();
});

/* ── SQMO Staff ── */
const usernameSQMO    = document.getElementById("usernameSQMO");
const addAccountBtnSQMO = document.getElementById("addAccountBtnSQMO");
const accountListSQMO = document.getElementById("accountListSQMO");

let accountsSQMO = JSON.parse(localStorage.getItem("accountsSQMO")) || [];
let sortSQMO = "none"; // "none" | "asc" | "desc"

function saveAccountsSQMO() {
    localStorage.setItem("accountsSQMO", JSON.stringify(accountsSQMO));
}

function renderAccountsSQMO() {
    accountListSQMO.innerHTML = "";
    if (accountsSQMO.length === 0) {
        maybeShowEmpty(accountListSQMO);
        return;
    }
    getSorted(accountsSQMO, sortSQMO).forEach(({ acc, i }) => {
        accountListSQMO.appendChild(createAccountItem(acc, i, "sqmo"));
    });
}

renderAccountsSQMO();

addAccountBtnSQMO.onclick = () => {
    const username = usernameSQMO.value.trim();
    if (!username) { usernameSQMO.focus(); return; }
    accountsSQMO.push({ username });
    saveAccountsSQMO();
    renderAccountsSQMO();
    usernameSQMO.value = "";
};

usernameSQMO.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addAccountBtnSQMO.click();
});

/* ── Sort buttons ── */
function cycleSortState(current) {
    if (current === "none") return "asc";
    if (current === "asc")  return "desc";
    return "none";
}

function updateSortBtn(btn, state) {
    const arrow = btn.querySelector(".sort-arrow");
    if (state === "none") {
        btn.classList.remove("active", "desc");
        btn.innerHTML = `<span class="sort-arrow">↑</span> A–Z`;
    } else if (state === "asc") {
        btn.classList.add("active");
        btn.classList.remove("desc");
        btn.innerHTML = `<span class="sort-arrow">↑</span> A–Z`;
    } else {
        btn.classList.add("active", "desc");
        btn.innerHTML = `<span class="sort-arrow">↑</span> Z–A`;
    }
}

const sortBtnAccreditor = document.getElementById("sortBtnAccreditor");
sortBtnAccreditor.onclick = () => {
    sortAccreditor = cycleSortState(sortAccreditor);
    updateSortBtn(sortBtnAccreditor, sortAccreditor);
    renderAccountsAccreditor();
};

const sortBtnSQMO = document.getElementById("sortBtnSQMO");
sortBtnSQMO.onclick = () => {
    sortSQMO = cycleSortState(sortSQMO);
    updateSortBtn(sortBtnSQMO, sortSQMO);
    renderAccountsSQMO();
};