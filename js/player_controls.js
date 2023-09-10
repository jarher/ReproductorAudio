import { progress_bar_state } from "./progress_bar.js";
import { audio_duration, audio_remaining } from "./time_format.js";

function play_audio() {
  const audio = document.querySelector("audio");
  audio.play();
  audio.addEventListener("timeupdate", () => {
    const duration = audio.duration;
    const remainig = duration - (duration - audio.currentTime);
    audio_duration(duration);
    audio_remaining(remainig);
    progress_bar_state(audio, duration);
  });
}

function pause_audio() {
  const audio = document.querySelector("audio");
  audio.pause();
}


export { play_audio, pause_audio };
