import { pause_audio, play_audio } from "./player_controls.js";
import { select_currenTime } from "./progress_bar.js";
import data from "./data.js";
import {
  volume_changed,
  volume_control,
  volume_default,
  volume_pulsed,
} from "./volume_bar.js";
import { change_item, playlist, toggle_playlist } from "./playlist.js";

let index_data = 0;
let num_clicks = 0;
let vol_changed;

//cambia el texto interno de #play-audio
const change_playTextContent = (text) =>
  (document.querySelector("#play-audio").textContent = text);

//reproduce el tema musical una vez seleccionado
function select_theme(e) {
  const item_index = e.target.dataset.index;
  load_audio(data[item_index].url);
  change_item(item_index);
  volume_changed(vol_changed);
  change_playTextContent("pause");
  index_data = item_index;
  play_audio();
}
//vincula el evento click a cada item de la playlist
function get_item_list() {
  const items = Array.from(document.querySelectorAll(".item-list"));
  items.forEach((element) => {
    element.addEventListener("click", select_theme);
  });
}

//mostrar el título de la canción y el nombre del artista
function set_theme_data(index) {
  const theme = data[index];
  document.querySelector(".title-song").textContent = theme.title;
  document.querySelector(".artist").textContent = theme.artist;
  change_cover(index);
}
//muestra la imagen del tema musical
const change_cover = (index) =>
  (document.querySelector(
    ".player-cover"
  ).style.backgroundImage = `url("../img/${data[index].image}")`);

//carga la canción
function load_audio(url) {
  const audio = document.createElement("audio");
  const audio_wrapper = document.querySelector(".audio-wrapper");
  audio.preload = "auto";
  audio.src = url;
  audio_wrapper.innerHTML = "";
  audio_wrapper.appendChild(audio);
  document.querySelector("audio").addEventListener("ended", () => {
    index_data++;
    if (index_data < data.length) {
      skip_function(index_data);
    }
  });
}

function select_audio_data(index) {
  set_theme_data(index);
  load_audio(data[index].url);
}
//reproduce el audio seleccionado
function skip_function(index) {
  select_audio_data(index);
  change_playTextContent("pause");
  change_item(index);
  play_audio();
  volume_changed(vol_changed);
}

document.addEventListener("click", (e) => {
  if (e.target.className.includes("button-playlist")) {
    toggle_playlist();
  }
  if (e.target.id === "play-audio") {
    if (e.target.textContent === "play_arrow") {
      play_audio();
      change_playTextContent("pause");
    } else {
      pause_audio();
      change_playTextContent("play_arrow");
    }
  }
  if (e.target.id === "skip-previous") {
    index_data <= 0 ? (index_data = data.length - 1) : (index_data -= 1);
    skip_function(index_data);
  }
  if (e.target.id === "skip-next") {
    index_data >= data.length - 1 ? (index_data = 0) : (index_data += 1);
    skip_function(index_data);
  }
  if (e.target.id === "bar") {
    select_currenTime(e);
  }
  if (e.target.id === "volume-button") {
    if (num_clicks === 4) num_clicks = 0;
    volume_pulsed(num_clicks, vol_changed);
    num_clicks++;
  }
  if (e.target.id === "volume-bar") {
    vol_changed = volume_control(e);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  playlist();
  get_item_list();
  select_audio_data(index_data);
  volume_default();
});
