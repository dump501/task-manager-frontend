import { Lock, Person } from '@mui/icons-material'
import { Box, Button, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Paper
        sx={{
          py: 4,
          px: 4,
          maxWidth: { sm: "95%", md: "700px" },
          minWidth: { sm: "95%", md: "50%" },
          pb: "4rem"
        }}>
        <Box>
          <Typography variant='h2'
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 4
            }}>Login</Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              placeholder='email@example.com'
              InputProps={{
                startAdornment: <InputAdornment><Person /> </InputAdornment>
              }} />
            <TextField
              fullWidth
              placeholder='password'
              InputProps={{
                startAdornment: <InputAdornment><Lock /> </InputAdornment>
              }} />
            <Box display="flex" justifyContent="center">
              <Button
                size='lg'
                variant='contained'
                onClick={()=>{navigate("/dashboard")}}
              >
                Login</Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}

export default Home
