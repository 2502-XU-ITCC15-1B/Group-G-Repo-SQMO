const buttons = document.querySelectorAll(".report_btn, .ndreport_btn");
let linksCache = null;

async function getLinks() {
  if (!linksCache) {
    const data = await sqmoApi.get("/report-links");
    linksCache = data.links || {};
  }
  return linksCache;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const key = btn.dataset.key;
    if (!key) return;

    try {
      const links = await getLinks();
      const url = links[key];
      if (url) {
        window.open(url, "_blank");
      } else {
        alert("No link assigned yet.");
      }
    } catch (e) {
      linksCache = null;
      alert(
        "Could not load report links. Run the Flask backend (see server/README.md).\n\n" +
          e.message
      );
    }
  });
});
