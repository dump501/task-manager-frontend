import { useTheme } from '@emotion/react'
import React from 'react'
import { tokens } from '../theme'
import { Box, Typography } from '@mui/material'

const Header = ({title, subtitle}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
  return (
    <Box>
        <Typography variant='h2' color={colors.grey[100]} fontWeight="bold" sx={{mb: "5px"}}>
            {title}
        </Typography>
        <Typography variant='h5'>
            {subtitle}
        </Typography>
    </Box>
  )
}

export default Header
