declare module "clappr" {
  export interface PlayerOptions {
    source: string;
    parentId: string;
    autoPlay?: boolean;
    loop?: boolean;
    width?: number | string;
    playback?: {
      playInline?: boolean;
    };
    gaAccount?: string;
    gaTrackerName?: string;
    hideMediaControl?: boolean;
    hideMediaControlDelay?: number;
    mediacontrol?: {
      seekbar?: string;
      button?: string;
    };
    poster?: string;
    events?: {
      onReady?: (e: any) => any;
      onResize?: (e: any) => any;
      onPlay?: (e: any) => any;
      onPause?: (e: any) => any;
      onStop?: (e: any) => any;
      onEnded?: (e: any) => any;
      onSeek?: (e: any) => any;
      onError?: (e: any) => any;
      onTimeUpdate?: (e: any) => any;
      onVolumeUpdate?: (e: any) => any;
    };
  }

  export interface Player extends PlayerOptions {
    resize: (
      options: { width: number | string; height: number | string }
    ) => void;
  }

  export class Player {
    constructor(options: PlayerOptions);
  }
}
