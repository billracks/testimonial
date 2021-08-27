import React from 'react';
import { NavLink, Route, Router } from 'react-router-dom';
import { firestore } from './firebase';
import {Link } from "react-router-dom";
import Page2 from './SignUp'

class SignInForm extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            cellno: "",
            studentemail: "",
            password: "",
            studentno: "",
            userData: [],
        }
    };
    /// handle states
    updateInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // Login User
    getData = event => {
        event.preventDefault()
         firestore.collection("User").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let studentno = this.state.studentemail.slice(0,9);
          console.log(studentno)
          if (studentno == doc.id ){
              //console.log('Yes found It')
              let currentData = [];
              currentData.push(doc.data());
              this.setState({ userData: currentData });
              this.state.userData.map(data => {
                  if(data.password == this.state.password){
                  //console.log(data.password)
                  console.log('done')
                   
                  
                  
                }
              })
              
          }
         
      });
  });
    }
  
    render() {

        const { 
        studentemail,
		password,
        userData,
       } = this.state
        
      return (
          <div className="container">
        <form >
         
          <br />
          <br />
         
          <br />
          <br />
          
          <br />     
          <br />  
           <div>
          <label> Student Email </label>
          </div>
                     <input
                        className='input'
                        type='text'
                        placeholder='UJ Student Email'
                        name='studentemail'
                        onChange={this.updateInput}
                        value={studentemail}
          />
          <br />
          <br />
          <div>
          <label> Password </label>
          </div>
                     <input
                        className='input'
                        type='text'
                        placeholder='Password'
                        name='password'
                        onChange={this.updateInput}
                        value={password}
          />
          <br />
          <br />
          
          <br />
          <br />
     <button className="submitButton"  onClick={this.getData}  >
    <NavLink to="/about">About</NavLink>
activeClassName: string <p6 className="submitButtonText">Submit</p6></button>
<button className="submitButton">
    <NavLink to="/Home"><p6 className="submitButtonText">Submit</p6></NavLink>
</button>
                </form>
                </div>
      );
    }
  }
  
export default SignInForm;