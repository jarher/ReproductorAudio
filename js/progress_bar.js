function progress_bar_state(audio, duration) {
  const progress_bar = document.querySelector(".bar");
  const value = (audio.currentTime * 100) / duration;
  progress_bar.value = value;
}

function select_currenTime(e) {
  const audio = document.querySelector("audio");
  const max_width = 350;
  const currentBarPosition = e.layerX;
  audio.currentTime = (currentBarPosition * audio.duration) / max_width;
}
export { progress_bar_state, select_currenTime };
