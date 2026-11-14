import type { ComponentType } from 'react'

declare const MoltenMetal: ComponentType<{
  colors?: string[]
  coreColor?: string
  backgroundColor?: string
  speed?: number
  scale?: number
  detail?: number
  glow?: number
  thickness?: number
  haze?: number
  brightness?: number
  intro?: boolean
  mouseInteraction?: boolean
  flareOnClick?: boolean
  dpr?: number
}>

export default MoltenMetal
