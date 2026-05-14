import type { SvgIconComponent } from '@mui/icons-material'

export interface DemoTask {
  id: number
  text: string
  done: boolean
}

export interface FocusItem {
  Icon: SvgIconComponent
  title: string
  description: string
}
