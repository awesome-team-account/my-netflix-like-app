import type { TitleCard } from '@/types'

export type PerPage = 2 | 3 | 4 | 5 | 6

export type SliderState = {
  initialized: boolean
  showControls: boolean
  cards: Array<TitleCard>
  perPage: PerPage
  perSlide: number
  page: number
}
