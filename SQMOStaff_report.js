let editMode = false;

const editBtn = document.querySelector(".edit_btn");
const allButtons = document.querySelectorAll(".report_btn, .ndreport_btn");

function toggleEdit() {
    editMode = !editMode;
    editBtn.textContent = editMode ? "Edit: ON" : "Edit: OFF";
}

allButtons.forEach(btn => {
    const key = btn.dataset.key;

    btn.addEventListener("click", () => {

      
        if (editMode) {
            let existing = localStorage.getItem(key) || "";

            let newLink = prompt(
                "Input Google Drive Link (leave empty to delete):",
                existing
            );

            if (newLink === null) {
                return;
            }

            newLink = newLink.trim();

            if (newLink === "") {
                let confirmDelete = confirm("Delete this link?");
                if (confirmDelete) {
                    localStorage.removeItem(key);
                    alert("Link deleted!");
                }
            }

            else {
                localStorage.setItem(key, newLink);
                alert("Link saved!");
            }
        }

        else {
            let link = localStorage.getItem(key);

            if (link) {
                window.open(link, "_blank");
            } else {
                alert("No link assigned yet.");
            }
        }

    });
});