import {
  Container,
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from "@mui/material";
import DateTimePicker from '@mui/lab/DateTimePicker';
import React, { Component } from "react";
import * as API from '../actions'
import toast from 'react-hot-toast';


function getVaccineCenter() {
  return [
    { name: "None", id: 0},
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];
}


const centerData = [
  { capacity: "NA",schedule: "NA"},
  { capacity: 10,schedule: "06:00 AM to 09:00 AM"},
  { capacity: 5,schedule: "09:00 AM to 12:00 PM"},
  { capacity: 50,schedule: "12:00 PM to 03:00 PM"},
  { capacity: 100,schedule: "03:00 PM to 06:00 PM"},
]


var round = 1000 * 60 * 15;
var myDate = new Date()
var rounded = new Date(Math.ceil(myDate.getTime() / round) * round)

const initState  = {
  nric_number: '',
  full_name:'',
  selectedCenter: 0,
  date: rounded,
  errors: {},
};

export class VaccineRegistration extends Component {
  constructor(props) {
    super(props);
    
    this.state = initState;

    this.handleSelect = this.handleSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  
  }

  handleValidation() {
    let full_name = this.state.full_name;
    let nric_number = this.state.nric_number;
    let selectedCenter = this.state.selectedCenter;
    let errors = {};
    let formIsValid = true;

    
    if (!full_name) {
      formIsValid = false;
      errors["name"] = "Full Name cannot be empty";
      errors["nameFlag"] = true;
    }
    
    if (!nric_number) {
      formIsValid = false;
      errors["nric"] = "NRIC Number cannot be empty";
      errors["nricFlag"] = true;
    }

    if (selectedCenter ==0) {
      formIsValid = false;
      errors["center"] = "Center is required";
      errors["centerFlag"] = true;
    }


    this.setState({ errors: errors });
    return formIsValid;
  }


  handleSelect(event) {
    const state = this.state;
    this.setState({...state, selectedCenter: event.target.value});
  }
  handleDateChange= async(value) => {
    const state = this.state;
    var step = 1000 * 60 * 15;
    var myNewDate = new Date(value)
    var setDate = new Date(Math.ceil(myNewDate.getTime() / step) * step)
    this.setState({...state, date: setDate});
  }

  onSubmit(e){
    e.preventDefault()

    if(!this.handleValidation())
      return
    
    let formData = new FormData();
    formData.append('nric_number', this.state.nric_number);
    formData.append('full_name', this.state.full_name);
    formData.append('center', this.state.selectedCenter);
    formData.append('slot', this.state.date);

    API.addBooking(formData).then((r) => {
      if (r.status==1) {
        toast.success(r.message)
        
        myDate = new Date()
        rounded = new Date(Math.ceil(myDate.getTime() / round) * round)
        initState.date = rounded
        this.setState(initState)
        
      }else{
        toast.error(r.message)
      }
    }).catch(error=>{
      toast.error('Registration failed!')
    })


  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box
            component="form"
            sx={{
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5">
              Book a slot
            </Typography>
            
              <FormControl  sx={{ m: 1, minWidth: '100%' }}>
                <TextField
                
                  margin="normal"
                  required
                  fullWidth
                  id="nric"
                  label="NRIC Number"
                  name="nric_number"
                  autoComplete="nric"
                  sx={{mb: 2}}
                  value={this.state.nric_number}
                  onChange={this.onChange}
                  helperText={this.state.errors["nric"]}
                  error={this.state.errors["nricFlag"]}
                  autoFocus
                />
              </FormControl>
              
              <FormControl  sx={{ m: 1, minWidth: '100%' }}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="full_name"
                  value={this.state.full_name}
                  onChange={this.onChange}
                  helperText={this.state.errors["name"]}
                  error={this.state.errors["nameFlag"]}
                  autoComplete="name"
                  sx={{mb: 2}}
                />
              </FormControl>
              <FormControl  sx={{ m: 1, minWidth: '100%' }}>
              <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
              <Select
                labelId="vaccineCenterLabel"
                label="Vaccine Center"
                required
                fullWidth
                id="vaccineCenter"
                value={this.state.selectedCenter}
                onChange={this.handleSelect}
                error={this.state.errors["centerFlag"]}
                sx={{mb: 2}}
              >
                {getVaccineCenter().map((v) => {
                  return <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>;
                })}
              </Select>
              
              <FormHelperText>Center Daily Capacity: {centerData[this.state.selectedCenter].capacity}, Nurses Schedule: {centerData[this.state.selectedCenter].schedule}</FormHelperText>
              {this.state.errors["centerFlag"] ?
              <>
                <span style={{color:'red'}}><small>Center is required</small></span><br></br><br></br>
              </>  
              : ""}
              </FormControl>
              
              <FormControl  sx={{ m: 1, minWidth: '100%' }}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Slot"
                  value={this.state.date}
                  onChange={this.handleDateChange}
                  minutesStep="15"
                  disablePast
                  required
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={this.onSubmit}
              >
                Register!
              </Button>

          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
