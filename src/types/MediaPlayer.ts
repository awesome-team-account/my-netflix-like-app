import { ComputedRef, WritableComputedRef } from 'vue'

export default interface MediaPlayer {
  muted: WritableComputedRef<boolean>
  readonly ended: ComputedRef<boolean>
  play: () => Promise<void> | undefined
  pause: () => void | undefined
}
