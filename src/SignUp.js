import React from 'react';
import { firestore } from './firebase';
import Text from 'react';

class SignUpForm extends React.Component {

    state = {
		firstname: "",
		lastname: "",
        cellno: "",
        studentemail: "",
		password: "",
        confirmpassword: "",
	}

    updateInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addUser = event => {
        event.preventDefault()
    
        firestore.collection("User").add({
            
            firstname: this.state.firstname,
		    lastname: this.state.lastname,
            cellno:this.state.cellno,
            studentemail: this.state.studentemail,
		    password: this.state.password,
            confirmpassword: this.state.confirmpassword,
        })
    
        this.setState({firstname: "",
		lastname: "",
        cellno: "",
        studentemail: "",
		password: "",
        confirmpassword: "", })
    }
  
    render() {

        const { firstname,
		lastname,
        cellno,
        studentemail,
		password,
        confirmpassword} = this.state
        
      return (
          <div className="container">
        <form onSubmit={this.addUser}>
            
            <div>
            <label> Name: </label>
            </div>
                    <input
                    className='input'
                        type='text'
                        placeholder='First Name'
                        name='firstname'
                        onChange={this.updateInput}
                        value={firstname}
          />
         
          <br />
          <br />
          <div>
          <label> Lastname : </label>
          </div>
                    <input
                    className='input'
                        type='text'
                        placeholder='Last Name'
                        name='lastname'
                        onChange={this.updateInput}
                        value={lastname}
          />
          <br />
          <br />
          <div>
          <label> Cell No: </label>
          </div>
                     <input
                        className='input'
                        type='text'
                        placeholder='Cell No'
                        name='cellno'
                        onChange={this.updateInput}
                        value={cellno}
          />
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
          <div>
          <label> Confirm Password</label>
          </div>
                    <input
                        className='input'
                        type='text'
                        placeholder='Confirm Password'
                        name='confirmpassword'
                        onChange={this.updateInput}
                        value={confirmpassword}
          />
          <br />
          <br />
                    <button className="submitButton" type='submit'><p6 className="submitButtonText">Submit</p6></button>
                </form>
                </div>
      );
    }
  }
  
export default SignUpForm;