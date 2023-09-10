import data from "./data.js";

const playlist_template = (index, object) =>
  `<div class="item-list ${
    index === 0 ? "selected-item" : ""
  }" data-index=${index}>${index + 1}. ${object.artist} - ${
    object.title
  }</div>`;

//imprime la playlist en pantalla
function playlist() {
  let playListContent = "";
  let playListItems = data.map((object, index) => {
    return playlist_template(index, object);
  });
  playListItems.forEach((element) => (playListContent += element));
  document.querySelector(".playlist").innerHTML = playListContent;
}

//indica el tema seleccionado de la playlist
function change_item(index) {
  const items = Array.from(document.querySelectorAll(".item-list"));
  items.forEach((element) => {
    if (element.dataset.index !== index) {
      element.classList.remove("selected-item");
    }
  });
  items[index].classList.add("selected-item");
}

const toggle_playlist = () =>
  document.querySelector(".playlist").classList.toggle("hidePlaylist");

export { playlist, toggle_playlist, change_item };
