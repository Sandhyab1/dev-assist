import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { fetchUsers } from '../../../apis/api';
import { Button } from '@mui/material';

const columns = [
  { id: 'username', label: 'Username', minWidth: 100 },
  {
    id: 'user',
    label: 'User',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'admin',
    label: 'Admin',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'moderator',
    label: 'Moderator',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function ManagerUsers() {

  const [users, setUsers] = useState([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleRoleChange = (userId, role, isChecked) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user._id === userId) {
          const currentRoles = user.role || [];
          let updatedRoles;
          
          if (isChecked) {
            // Add role if not already present
            updatedRoles = currentRoles.includes(role) 
              ? currentRoles 
              : [...currentRoles, role];
          } else {
            // Remove role
            updatedRoles = currentRoles.filter(r => r !== role);
          }
          
          return { ...user, role: updatedRoles };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    fetchUsers()
      .then(response => {
        console.log("Fetched users:", response.data.users);
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });

  }, []);

  console.log("Users:", users);

  return (
     <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users && users.map(user => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell align="right">
                    <Checkbox 
                      checked={user.role && user.role.includes('user')} 
                      onChange={(e) => handleRoleChange(user._id, 'user', e.target.checked)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox 
                      checked={user.role && user.role.includes('admin')}  
                      onChange={(e) => handleRoleChange(user._id, 'admin', e.target.checked)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox 
                      checked={user.role && user.role.includes('moderator')}  
                      onChange={(e) => handleRoleChange(user._id, 'moderator', e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Paper 
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 2,
          backgroundColor: 'white',
          borderTop: '1px solid #e0e0e0',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Paper>
    </>
  )
}

export default ManagerUsers