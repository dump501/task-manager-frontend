import React from 'react'
import AdminLayout from './Global/AdminLayout'
import { Box, Button, Stack } from '@mui/material'
import Header from '../Components/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  {
    field: "title",
    headerName: "Title",
    flex: 1
  },
  {
    field: "deadline",
    headerName: "Deadline",
    flex: 1
  },
  {
    field: "current_status",
    headerName: "Status",
    flex: 1
  },
  {
    field: "created_by",
    headerName: "Created by",
    flex: 1
  },
  {
    field: "tag",
    headerName: "Tag",
    flex: 1
  },
]

const data = [
  {
    id: 1,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 2,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 3,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 4,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 6,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 7,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 8,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 9,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 10,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
  {
    id: 11,
    title: "Task title",
    deadline: "04/02/2003",
    current_status: "In progress",
    created_by: "Tsafack Fritz",
    tag: "Error"
  },
]

const Tasks = () => {
  return (
    <AdminLayout>
      <Box m={2} boxSizing="border-box">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}>
          <Header title="MY TASKS" subtitle="Tasks assigned to me" />
        </Box>
        <Box boxSizing="border-box" width="100%">
          <DataGrid 
          columns={columns} 
          rows={data}
          slots={{toolbar: GridToolbar}} />
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default Tasks
