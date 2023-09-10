// formato de duracion: minutos:segundos
function time_format(value) {
  if (typeof value !== NaN) {
    let minutes = Number.parseInt(value / 60);
    let seconds = Math.round(value % 60);
    minutes = minutes < 10 ? `0${minutes.toString()}` : minutes.toString();
    seconds = seconds < 10 ? `0${seconds.toString()}` : seconds.toString();
    return `${minutes}:${seconds}`;
  }
}
const audio_duration = (value) =>
  (document.querySelector(".duration").textContent = time_format(value));

const audio_remaining = (value) =>
  (document.querySelector(".time-remain").textContent = time_format(value));

export { audio_duration, audio_remaining };
