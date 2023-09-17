import { ChevronLeft, Mail } from '@mui/icons-material'
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from '../../Redux/ui'
import { drawerWidth } from '../../helpers/uiHelpers'

const DrawerHeader = styled('div')(() =>({
  display: 'flex',
  alignItems: "center",
  justifyContent: "flex-end"
}))

const Sidebar = () => {
  const dispatch = useDispatch()
  const {isDrawerOpen} = useSelector((state) => state.ui)
  
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: "border-box"
        }

      }}
      variant='persistent'
      anchor='left'
      open={isDrawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={()=> dispatch(closeDrawer())}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Draft"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon> <Mail /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
