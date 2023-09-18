import { ChevronLeft, Mail } from '@mui/icons-material'
import {
  Avatar, Box, Drawer,
  IconButton, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, styled
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from '../../Redux/ui'
import { drawerWidth } from '../../helpers/uiHelpers'
import { Link } from 'react-router-dom';

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: "center",
  justifyContent: "space-between"
}))

const Sidebar = ({ items }) => {
  const dispatch = useDispatch()
  const { isDrawerOpen } = useSelector((state) => state.ui)

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
        <h2>Task manager</h2>
        <IconButton onClick={() => dispatch(closeDrawer())}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Box display="flex" flexDirection="column" alignItems="center" py={1}>
        <Avatar sx={{ width: 100, height: 100 }} />
        <h2>Tsafack Fritz</h2>
        <Typography>Admin</Typography>
      </Box>
      <List>
        {items.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton to={item.to} component={Link}
              sx={{
                minHeight: 48,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  px: 2.5,
                }}> {item.icon} </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar