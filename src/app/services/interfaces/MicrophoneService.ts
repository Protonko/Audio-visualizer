export interface MicrophoneService {
  initialized: boolean
  samples: Uint8Array | null
  volume: number | null
}
