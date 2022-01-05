import type { Ref, WritableComputedRef } from 'vue'

export type MediaPlayer = {
  muted: WritableComputedRef<boolean> | boolean
  readonly ended: Ref<boolean>
  readonly playing: Ref<boolean>
  play: () => Promise<void> | undefined
  pause: () => void | undefined
}
