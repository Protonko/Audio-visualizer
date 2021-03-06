import type {MicrophoneService} from '@services/interfaces/MicrophoneService'
import {injectable} from 'inversify'

@injectable()
export class MicrophoneServiceImpl implements MicrophoneService {
  private _initialized: boolean
  private _audioContext?: AudioContext
  private _microphone?: MediaStreamAudioSourceNode
  private _analyser?: AnalyserNode
  private readonly _fftSize: number
  private _ui8a?: Uint8Array

  constructor() {
    this._initialized = false
    this._fftSize = 1024

    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
      this._audioContext = new AudioContext()
      this._microphone = this._audioContext.createMediaStreamSource(stream)
      this._analyser = this._audioContext.createAnalyser()
      this._ui8a = new Uint8Array(this._analyser.frequencyBinCount)
      this._microphone.connect(this._analyser)
      this._initialized = true
    }).catch(error => {
      console.error(error)
    })
  }

  get fftSize() {
    return this._fftSize
  }

  get initialized() {
    return this._initialized
  }

  get samples() {
    if (this._analyser && this._ui8a) {
      this._analyser.getByteTimeDomainData(this._ui8a)

      return Array.from(this._ui8a).map(elem => elem / 128 - 1)
    } else {
      return null
    }
  }

  get volume() {
    if (this._analyser && this._ui8a) {
      this._analyser.getByteTimeDomainData(this._ui8a)
      const sum = this._ui8a.reduce((acc, elem) => acc + (elem / 128 - 1)**2, 0)

      return Math.sqrt(sum / this._ui8a.length)
    } else {
      return null
    }
  }
}
