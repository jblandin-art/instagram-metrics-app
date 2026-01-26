document.getElementById("close-btn").addEventListener("click", () => {
  window.close();
});

document.getElementById("minimize-btn").addEventListener("click", () => {
  window.minimize();
});

document.getElementById("maximize-btn").addEventListener("click", () => {
  if (window.isMaximized()) {
    window.unmaximize();
    } else {
    window.maximize();
    }
});

