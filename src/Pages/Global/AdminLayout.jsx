import { Box } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import { drawerWidth } from '../../helpers/uiHelpers'
import { useSelector } from 'react-redux'
import Topbar from './Topbar'
import { Mail } from '@mui/icons-material'

const items = [
    {
        title: "Dashboard",
        icon: <Mail />,
        to: "/dashboard"
    },
    {
        title: "Tasks",
        icon: <Mail />,
        to: "/tasks"
    },
    {
        title: "Manage users",
        icon: <Mail />,
        to: "/users"
    },
    {
        title: "Profile",
        icon: <Mail />,
        to: "/profile"
    },
]

const AdminLayout = ({children}) => {
    const {isDrawerOpen} = useSelector((state) => state.ui)
    return (
        <Box display="flex">
            <Sidebar items={items} />
            <Box
                sx={{
                    ml: isDrawerOpen ? "0" : `-${drawerWidth}px`,
                    width: "100%"
                }}
            >
                <Topbar />
                {children}
            </Box>
        </Box>
    )
}

export default AdminLayout
