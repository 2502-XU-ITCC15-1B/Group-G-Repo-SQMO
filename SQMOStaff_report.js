let editMode = false;
let linksCache = {};

const editBtn = document.querySelector(".edit_btn");
const allButtons = document.querySelectorAll(".report_btn, .ndreport_btn");

function staffWriteError(e) {
  if (e && e.status === 401) {
    alert(
      "The server rejected this change (staff token).\n" +
        "Set your token to match STAFF_API_TOKEN:\n" +
        "localStorage.setItem('sqmo_staff_token', 'YOUR_TOKEN')"
    );
    return;
  }
  alert("Request failed: " + (e.message || e));
}

async function refreshLinks() {
  const data = await sqmoApi.get("/report-links");
  linksCache = data.links || {};
}

function toggleEdit() {
  editMode = !editMode;
  editBtn.textContent = editMode ? "Edit: ON" : "Edit: OFF";
}

editBtn.addEventListener("click", toggleEdit);

allButtons.forEach((btn) => {
  const key = btn.dataset.key;

  btn.addEventListener("click", async () => {
    if (!key) return;

    try {
      if (editMode) {
        await refreshLinks();
        const existing = linksCache[key] || "";

        const newLink = prompt(
          "Input Google Drive Link (leave empty to delete):",
          existing
        );

        if (newLink === null) {
          return;
        }

        const trimmed = newLink.trim();

        if (trimmed === "") {
          const confirmDelete = confirm("Delete this link?");
          if (!confirmDelete) {
            return;
          }
          try {
            await sqmoApi.delete("/report-links/" + encodeURIComponent(key));
            delete linksCache[key];
            alert("Link deleted!");
          } catch (e) {
            if (String(e.message || e).includes("404")) {
              delete linksCache[key];
              alert("No link was stored for this item.");
            } else {
              staffWriteError(e);
            }
          }
        } else {
          await sqmoApi.put("/report-links/" + encodeURIComponent(key), {
            url: trimmed,
          });
          linksCache[key] = trimmed;
          alert("Link saved!");
        }
      } else {
        await refreshLinks();
        const link = linksCache[key];

        if (link) {
          window.open(link, "_blank");
        } else {
          alert("No link assigned yet.");
        }
      }
    } catch (e) {
      staffWriteError(e);
    }
  });
});
