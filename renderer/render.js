document.getElementById("close-btn").addEventListener("click", () => {
  window.windowControls.close();
});

document.getElementById("minimize-btn").addEventListener("click", () => {
  window.windowControls.minimize();
});

document.getElementById("maximize-btn").addEventListener("click", () => {
  if (window.windowControls.isMaximized()) {
    window.windowControls.unmaximize();
    } else {
    window.windowControls.maximize();
    }
});

