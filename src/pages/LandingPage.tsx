import { Box } from '@mui/material'
import { HeroSection } from '@/components/landing/HeroSection'
import { InteractiveDemo } from '@/components/landing/InteractiveDemo'
import { FocusSection } from '@/components/landing/FocusSection'
import { CTASection } from '@/components/landing/CTASection'

export function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <HeroSection />
      <InteractiveDemo />
      <FocusSection />
      <CTASection />
    </Box>
  )
}
