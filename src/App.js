import './App.css';
import {Route, Switch,BrowserRouter } from 'react-router-dom';
import {VaccineRegistration} from './containers/VaccineRegistration/VaccineRegistration';
import {VaccineRegistrationListing} from './containers/VaccineRegistration/ListVaccinationBooking';
import {EditVaccineRegistration} from './containers/VaccineRegistration/EditVaccinationBooking';
import { NavBar } from './containers/Nav';
import { Component } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Toaster } from 'react-hot-toast';

class App extends Component {
  componentDidMount() {
    document.title = 'Vaccination Center';
  }
  render() {
    return (
      <>
        <div>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
              <NavBar />
              <Switch>
                <Route path="/bookings" exact component={VaccineRegistrationListing} />
                <Route path="/bookings/:bookingId" exact component={EditVaccineRegistration} />
                <Route path="/" exact component={VaccineRegistration} />
              </Switch>
          </BrowserRouter>
        </LocalizationProvider>
      </>
    )
  }
}


export default App;
