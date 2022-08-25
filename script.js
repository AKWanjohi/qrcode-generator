const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a url!");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 100);
    }, 2000);
  }
});

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");

  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-400 text-white font-bold py-2 rounded w-full my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save As Image";

  document.getElementById("generated").appendChild(link);
};
