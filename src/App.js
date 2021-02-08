import './App.css';
import user from './user.png';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from 'react';

import OnboardingForm from "./Components/OnboardingForm";
import EditStudent from "./Components/EditStudentForm";
import ListStudents from './Components/ListStudents';
import ViewStudent from "./Components/ViewStudent";

class App extends Component {

  render() {
    return (

      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '30px',
          marginBottom: '30px',
          width: '800px',
          border: '1.5px darkblue',
          borderStyle: 'solid'
        }}>
        <BrowserRouter style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            borderBottom: '1.5px darkblue',
            borderBottomStyle: 'solid',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '30px'
          }}>
            <p style={{ fontSize: '30px', fontFamily: 'sans-serif', alignContent: 'center', paddingLeft: '50px' }}>On Boarding App</p>
            <div style={{ display: 'flex', flexDirection: 'row',paddingRight: '50px',marginTop : 'auto',marginBottom : 'auto', height: '100%' }}>
              <div>
                <img src={user} alt={"User"} style={{ width: '45px', height: '45px', paddingRight: '10px' }}></img>
              </div>
              <div><p style={{ fontSize: '18px', fontFamily: 'sans-serif'}}>Admin</p></div>
            </div>
          </div>

          <div className="Container">
            <Switch>
              <Route path="/students" component={ListStudents} />
              <Route path="/studentDetails/:studentId" component={ViewStudent} />
              <Route path="/editOnboard/:studentId" component={EditStudent} />
              <Route path="/addStudent" component={OnboardingForm} />
              <Redirect from="/" to="/students" />
            </Switch>
          </div>
        </BrowserRouter>
      </div>


    );
  }

}

export default App;
