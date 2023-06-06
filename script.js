document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.log('readyState: "Complete"');
    initApp();
  }
});

const initApp = () => {
  // PALETTE CARDS GENERATION

  const refreshBtn = document.querySelector(".refresh_btn");
  const switchBtn = document.querySelector(".switch_btn");

  const savedPaletteContainer = document.querySelector(
    ".saved_palette_container"
  );
  const savedPalette = document.querySelector("#saved_palette_container ul");
  const paletteGeneratorContainer = document.querySelector(
    ".palette_generator_container"
  );
  const paletteContainer = document.querySelector("#palette_container ul");
  let maxPaletteCards = 12;

  switchBtn.onclick = () => {
    if (switchBtn.innerText === "Saved Palette") {
      switchBtn.innerText = "Back";
      switchBtn.classList.add("back_btn");
    } else {
      switchBtn.classList.remove("back_btn");
      switchBtn.innerText = "Saved Palette";
    }
    refreshBtn.classList.toggle("disappear");
    paletteGeneratorContainer.classList.toggle("disappear");
    savedPaletteContainer.classList.toggle("active");
  };

  refreshBtn.addEventListener("click", () => {
    refreshBtn.innerText = "Generate" ? "Refresh" : "Generate";
    paletteContainer.innerHTML = ``;
    for (let i = 0; i < maxPaletteCards; i++) {
      let randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
      randomColor = `#${randomColor.padStart(6, "0")}`;
      let li = document.createElement("li");
      li.classList.add("color_card");
      li.innerHTML = `
        <section style="background: ${randomColor};" class="color"></section>
          <div>
            <button class="copy_btn">Copy</button>
            <div class="hex_display">${randomColor}</div>
            <img class="save_btn" width="15px" src="img/bookmark-solid.svg" alt="" />
          </div>
      `;
      paletteContainer.appendChild(li);
      copyColor(li, randomColor);
      const saveBtn = li.querySelector(".save_btn");
      saveBtn.onclick = () => {
        alert("Palette Saved");
        const savedColor = saveBtn.parentElement;
        const randomColor = savedColor.querySelector(".hex_display").innerText;
        const li = document.createElement("li");
        li.classList.add("color_card");
        li.innerHTML = `
          <section style="background: ${randomColor};" class="color"></section>
          <div>
            <button class="copy_btn">Copy</button>
            <div class="hex_display">${randomColor}</div>
            <img class="delete_btn" width="15px" src="img/trash-solid.svg" alt="" />
          </div> 
        `;
        savedPalette.appendChild(li);
        copyColor(li, randomColor);
        const deleteBtn = li.querySelector(".delete_btn");
        deleteBtn.onclick = () => {
          savedPalette.removeChild(li);
        };
      };
    }
  });

  const copyColor = (li, hexVal) => {
    const copyBtn = li.querySelector(".copy_btn");
    copyBtn.onclick = () => {
      navigator.clipboard
        .writeText(hexVal)
        .then(() => {
          const hexDisplay = li.querySelector(".hex_display");
          hexDisplay.innerText = "Copied";
          setTimeout(() => {
            hexDisplay.innerText = hexVal;
          }, 1500);
        })
        .catch(() => {
          alert("Failed");
        });
    };
  };
};
