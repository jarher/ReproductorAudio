const volume_default = () => (document.querySelector("audio").volume = 0.5);

function volume_control(e) {
  const volume_value = e.target.value;
  const audio = document.querySelector("audio");
  const volume_total = volume_value / 10;
  audio.volume = volume_total;
  return volume_total;
}

function volume_pulsed(value, vol_changed) {
  const volume_bar = document.querySelector(".volume-bar");
  const volume_buttom = document.querySelector(".volume-button");
  if (value === 0) {
    volume_bar.classList.toggle("volume-bar-show");
  }
  if (value === 1) {
    document.querySelector("audio").volume = 0;
    volume_buttom.textContent = "volume_off";
  }
  if (value === 2) {
    document.querySelector("audio").volume = vol_changed || 0.5;
    volume_buttom.textContent = "volume_up";
  }
  if (value === 3) {
    volume_bar.classList.toggle("volume-bar-show");
  }
}

const volume_changed = (value) =>
  (document.querySelector("audio").volume = value || 0.5);

export { volume_control, volume_default, volume_changed, volume_pulsed };
