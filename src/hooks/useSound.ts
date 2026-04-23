import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const sounds: Record<string, string> = {
  hover: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Subtle tick
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Soft click
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Success bell
  secret: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', // Deep pulse for secret
  shutter: 'https://assets.mixkit.co/active_storage/sfx/599/599-preview.mp3', // Camera shutter
  burst: 'https://assets.mixkit.co/active_storage/sfx/2418/2418-preview.mp3', // Firework burst
  matrix: 'https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3', // Digital beep
  brush: 'https://assets.mixkit.co/active_storage/sfx/1500/1500-preview.mp3', // Soft sweep
};

export function useSound() {
  const soundRefs = useRef<Record<string, Howl>>({});

  useEffect(() => {
    Object.entries(sounds).forEach(([key, url]) => {
      soundRefs.current[key] = new Howl({
        src: [url],
        volume: 0.2,
      });
    });

    return () => {
      Object.values(soundRefs.current).forEach((s: Howl) => s.unload());
    };
  }, []);

  const play = (name: string) => {
    if (soundRefs.current[name]) {
      soundRefs.current[name].play();
    }
  };

  return { play };
}
