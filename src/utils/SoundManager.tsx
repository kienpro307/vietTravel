import React from 'react';
import Sound from 'react-native-sound';
const audioList = [
  {
    title: 'Play xoSo',
    isRequire: true,
    url: require('../../assets/sound/xoSo1.mp3'),
  },
  {
    title: 'Play congratulation',
    isRequire: true,
    url: require('../../assets/sound/congratulation.mp3'),
  },
  {
    title: 'Play spinning',
    isRequire: true,
    url: require('../../assets/sound/spinning.mp3'),
  },
];
export const sounds: (Sound | null)[] = [null, null];
export function playSound(index: number) {
  const audioItem = audioList[index];
  if (!sounds[index]) {
    sounds[index] = new Sound(audioItem.url, (error: string | null) => {
      if (error !== null) {
        console.log(`Lỗi khi tạo âm thanh ${index}:`, error);
        return;
      }
      sounds[index]?.play(success => {
        if (success) {
          sounds[index]?.release();
        } else {
          console.log(`Lỗi khi phát âm thanh ${index}`);
        }
      });
    });
  } else {
    // Nếu âm thanh đang được phát, dừng và phát lại từ đầu
    sounds[index]?.stop();
    sounds[index]?.play();
  }
}
export function stopSound(index: number) {
  if (sounds[index]) {
    sounds[index]?.stop();
    sounds[index]?.release();
    sounds[index] = null;
  }
}
const SoundManager: React.FC = () => null;
export default SoundManager;
