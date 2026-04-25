import { Box, Typography, Grid } from '@mui/material'
import { focusItems } from '@/lib/landingData'

export function FocusSection() {
  return (
    <Box
      sx={{
        py: 10,
        px: 3,
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography
          variant="overline"
          sx={{ color: '#6366f1', letterSpacing: '0.15em', mb: 1 }}
        >
          Por qué funciona
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, letterSpacing: '-0.02em', mt: 1 }}
        >
          No vendemos listas.
          <br />
          Vendemos paz mental.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" maxWidth={840} mx="auto">
        {focusItems.map(({ Icon, title, description }) => (
          <Grid key={title} size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                border: '1px solid #1e1e1e',
                bgcolor: '#0f0f0f',
                height: '100%',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: '#6366f1' },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                  bgcolor: '#1a1a2e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <Icon sx={{ color: '#6366f1', fontSize: 26 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
