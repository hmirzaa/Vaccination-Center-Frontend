import {
  Table,
  Box,
  Button,
  CssBaseline,
  Typography,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Container,
} from "@mui/material";
import { Link } from 'react-router-dom';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { Component } from "react";
import * as API from '../actions'
import toast from 'react-hot-toast';


const centers = [
  { name: "None", id: 0},
  { name: "Bukit Batok CC", id: 1 },
  { name: "Bukit Panjang CC", id: 2 },
  { name: "Bukit Timah CC", id: 3 },
  { name: "Outram Park Polyclinic", id: 4 },
]


function getBooking() {
  return [
    {
      id: 1,
      name: "Tan Ah Kow",
      centerName: "Bukit Timah CC",
      centerId: 3,
      startTime: new Date("2021-12-01T09:00:00"),
    },
    {
      id: 2,
      name: "Jean Lee Ah Meow",
      centerName: "Bukit Timah CC",
      centerId: 3,
      startTime: new Date("2021-12-01T10:00:00"),
    },
    {
      id: 3,
      name: "Lew Ah Boi",
      centerName: "Bukit Timah CC",
      centerId: 3,
      startTime: new Date("2021-12-01T11:00:00"),
    },
  ];
}

export class VaccineRegistrationListing extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: []
    };

    
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount(){
    
    API.getAllBookings().then((r) => {
      if (r.status==1) {
        this.setState({data: r.data})
      }
    }).catch(error=>{
      toast.error('Failed to get data!')
    })
  }


  onDelete(id){
    API.deleteBookingById(id).then((r) => {
      if (r.status==1) {
        
        toast.error(r.message)
        API.getAllBookings().then((r) => {
          if (r.status==1) {
            this.setState({data: r.data})
          }
        }).catch(error=>{
          toast.error('Failed to get data!')
        })

      }else{
        toast.error(r.message)
      }
    }).catch(error=>{
      toast.error('Failed to get data!')
    })
  }


  
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{mt: 8}}>
            <Typography component="h1" variant="h5">
              Active Booking
            </Typography>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Center Name</TableCell>
                    <TableCell align="left">Start Time</TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.full_name}
                      </TableCell>
                      <TableCell align="left">{centers[row.center].name}</TableCell>
                      <TableCell align="left">
                        {new Date(row.slot).toString()}
                      </TableCell>
                      <TableCell align="left">
                        <Button component={Link} to={"/bookings/"+ row.id}>
                          <ModeEditIcon />
                        </Button>
                        <Button type="submit" onClick={()=>this.onDelete(row.id)} >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
