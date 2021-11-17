import { ReactNode } from 'react'

import HooksNoSSR from './hooks-no-ssr'
import ClassNoSSR from './class-no-ssr'

export interface NoSSRProps {
  children: ReactNode
  onSSR?: ReactNode
}

export {
  HooksNoSSR,
  ClassNoSSR
}
