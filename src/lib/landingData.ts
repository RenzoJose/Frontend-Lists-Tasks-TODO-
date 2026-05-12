import PsychologyIcon from '@mui/icons-material/Psychology'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import type { FocusItem } from '@/types/landing'

export const focusItems: FocusItem[] = [
  {
    Icon: PsychologyIcon,
    title: 'Captura el ruido',
    description: 'Vuelca todo lo que tienes en la cabeza. Sin filtros, sin orden.',
  },
  {
    Icon: FilterAltIcon,
    title: 'Organiza con claridad',
    description: 'Prioridades y estados en un solo lugar. Siempre sabes qué importa.',
  },
  {
    Icon: RocketLaunchIcon,
    title: 'Ejecuta con foco',
    description: 'Sin distracciones. Una tarea a la vez, avanzando de verdad.',
  },
]
