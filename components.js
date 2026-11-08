/* GBBooking shared layout loader.
   Add <div data-component="header"></div> and
   <div data-component="footer"></div> to any page that uses the master layout. */
document.addEventListener("DOMContentLoaded", async () => {
  const mounts = document.querySelectorAll("[data-component]");
  await Promise.all(Array.from(mounts).map(async (mount) => {
    const component = mount.dataset.component;
    if (!["header", "footer"].includes(component)) return;
    try {
      const response = await fetch(`/components/${component}.html`);
      if (!response.ok) throw new Error(`Unable to load ${component}: HTTP ${response.status}`);
      mount.innerHTML = await response.text();
      mount.dataset.loaded = "true";
    } catch (error) {
      console.error("GBBooking shared component error:", error);
      mount.innerHTML = `<div role="alert" class="p-3 text-center text-sm text-red-700">Unable to load the shared ${component}. Please refresh the page.</div>`;
    }
  }));
});
