

let isAdmin = false;

const adminToggle =
    document.getElementById("adminToggle");

const addBtn =
    document.getElementById("addBtn");

const programContainer =
    document.getElementById("programs");

const usernameInput =
    document.getElementById("username");

const programSelect =
    document.getElementById("programSelect");

const addAccountBtn =
    document.getElementById("addAccountBtn");

const accountList =
    document.getElementById("accountList");


let programs =
    JSON.parse(
        localStorage.getItem("programs")
    ) || [];

let accounts =
    JSON.parse(
        localStorage.getItem("accounts")
    ) || [];


function savePrograms() {

    localStorage.setItem(
        "programs",
        JSON.stringify(programs)
    );
}

function saveAccounts() {

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
}

function loadProgramOptions() {

    programSelect.innerHTML = "";

    programs.forEach(program => {

        const option =
            document.createElement("option");

        option.value =
            program.text;

        option.textContent =
            program.text;

        programSelect.appendChild(option);
    });
}


function renderPrograms() {

    programContainer.innerHTML = "";

    programs.forEach((program, index) => {

        // WRAPPER
        const wrapper =
            document.createElement("div");

        wrapper.className =
            "program-wrapper";

        // PROGRAM BUTTON
        const btn =
            document.createElement("button");

        btn.className =
            "program_btn";

        btn.textContent =
            program.text;

        btn.onclick = () => {

            if (!isAdmin) {

                window.location.href =
                    "SQMOStaff_report.html";
            }
        };

        wrapper.appendChild(btn);


        
        // =========================
        // ADMIN CONTROLS
        // =========================

        if (isAdmin) {

            const controls =
                document.createElement("div");

            controls.className =
                "controls";

            // EDIT BUTTON
            const editBtn =
                document.createElement("button");

            editBtn.textContent =
                "Edit";

            editBtn.className =
                "editBtn";

            editBtn.onclick = () => {

                const oldName =
                    program.text;

                const newName =
                    prompt(
                        "Edit Program Name:",
                        oldName
                    );

                if (!newName) return;

                // UPDATE PROGRAM
                programs[index].text =
                    newName;

                // UPDATE ACCOUNTS
                accounts.forEach(account => {

                    if (
                        account.program === oldName
                    ) {

                        account.program =
                            newName;
                    }
                });

                savePrograms();
                saveAccounts();

                renderPrograms();
                renderAccounts();
                loadProgramOptions();
            };

            // DELETE BUTTON
            const deleteBtn =
                document.createElement("button");

            deleteBtn.textContent =
                "X";

            deleteBtn.className =
                "deleteBtn";

            deleteBtn.onclick = () => {

                const deletedProgram =
                    program.text;

                // REMOVE PROGRAM
                programs.splice(index, 1);

                // REMOVE ACCOUNTS
                accounts =
                    accounts.filter(account =>
                        account.program !== deletedProgram
                    );

                savePrograms();
                saveAccounts();

                renderPrograms();
                renderAccounts();
                loadProgramOptions();
            };

            controls.appendChild(editBtn);
            controls.appendChild(deleteBtn);

            wrapper.appendChild(controls);
        }

        programContainer.appendChild(wrapper);
    });
}


function renderAccounts() {

    accountList.innerHTML = "";

    accounts.forEach((account, index) => {

        const li =
            document.createElement("li");

        li.textContent =
            account.username +
            " (" +
            account.program +
            ") ";

        // REMOVE BUTTON
        const removeBtn =
            document.createElement("button");

        removeBtn.textContent =
            "Remove";

        removeBtn.onclick = () => {

            accounts.splice(index, 1);

            saveAccounts();

            renderAccounts();
        };

        li.appendChild(removeBtn);

        accountList.appendChild(li);
    });
}


addBtn.onclick = () => {

    const name =
        prompt("Program Name:");

    if (!name) return;

    programs.push({

        id: Date.now(),

        text: name
    });

    savePrograms();

    renderPrograms();

    loadProgramOptions();
};



addAccountBtn.onclick = () => {

    const username =
        usernameInput.value.trim();

    const selectedProgram =
        programSelect.value;

    if (username === "") {

        alert("Enter Username");
        return;
    }

    accounts.push({

        username: username,

        program: selectedProgram
    });

    saveAccounts();

    usernameInput.value = "";

    renderAccounts();
};


adminToggle.onclick = () => {

    isAdmin = !isAdmin;

    adminToggle.textContent =
        isAdmin
            ? "Edit: ON"
            : "Edit: OFF";

    addBtn.style.display =
        isAdmin
            ? "inline-block"
            : "none";

    renderPrograms();
};



function logout() {

    window.location.href =
        "Landing_Page.html";
}



loadProgramOptions();

renderPrograms();

renderAccounts();