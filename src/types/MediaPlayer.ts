import { Ref, WritableComputedRef } from 'vue'

export default interface MediaPlayer {
  muted: WritableComputedRef<boolean>
  readonly ended: Ref<boolean>
  readonly playing: Ref<boolean>
  play: () => Promise<void> | undefined
  pause: () => void | undefined
}
