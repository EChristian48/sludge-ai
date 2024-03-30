import { PATH_AUDIO, PATH_SUB_VTT } from "../paths";

const VOICE = `en-US-AvaNeural`;
const EXECUTABLES = ["edge-tts", "edge-tts.exe"];

export const textToSpeech = async (text: string) => {
  EXECUTABLES.forEach((executable, index) => {
    try {
      return Bun.spawnSync([
        executable,
        "-v",
        VOICE,
        "-t",
        text,
        "--write-media",
        PATH_AUDIO,
        "--write-subtitles",
        PATH_SUB_VTT,
      ]);
    } catch (error) {
      if (index === EXECUTABLES.length - 1) {
        throw error;
      }
    }
  });
};
