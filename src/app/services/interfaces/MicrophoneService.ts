export interface MicrophoneService {
  initialized: boolean
  samples: number[] | null
  volume: number | null
  fftSize: number
}
