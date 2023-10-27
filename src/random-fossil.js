import axios from "axios";

document.getElementById("get-random-fossil").addEventListener("click", () => {
  axios.get("/random-fossil.json").then((res) => {
    console.log(res);

    const { name, img } = res.data;

    const fossilImage = document.getElementById("random-fossil-image");
    const ImageElement = document.createElement("img");
    ImageElement.src = img;
    fossilImage.appendChild(ImageElement);

    const fossilName = document.getElementById("random-fossil-name");
    fossilName.textContent = name;
  });
});
