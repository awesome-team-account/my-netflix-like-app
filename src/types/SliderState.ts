import type { TitleCard } from '@/types'

export type SliderState = {
  cards: Array<TitleCard>
  perPage: number
  page: number
}
