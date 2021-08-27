import React from 'react';
import jsPDF from 'jspdf';
import { firestore } from './firebase';
import Avatar from 'react-avatar';


class Testimonial extends React.Component {
   
    constructor(props) {
        super(props)
        this.state ={
           userData: [],
           newfirstname: "",
           newlastname:"",
           newcellno:"",
        }
    };
    //Call data upon component Mount
    componentDidMount(){
            var getme = this.getData();
            var toggleMe = this.toggleDiv()     
   }

   ///Toggle 'Save' Button 
  toggleDiv() {
      var x = document.getElementById("updateDiv");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
      console.log('toggled')
    }

    //Updating Input Value

    updateInput = event => {
       console.log('on change is working')
      this.setState({ [event.target.name]: event.target.value })
  }

    // Generate Testimonial PDF using jsPDF package
    generatePDF = () => {
     
      var doc = new jsPDF('p', 'pt');
      {this.state.userData.map(data => {
              
         doc.text(20, 20, 'Enactus Testimonial')

      doc.addFont('helvetica', 'normal')
      doc.text(20, 60, 'Name :' + data.name )
      doc.text(20, 100, 'Surname' + data.lastname )      

      
      doc.save(data.name + 'Enactus Testimonial.pdf')
         return (
            console.log('Print Executed')
         );
        
         })}
      
    }   
    
    //Enable  Text Areas For Editing 
    enableTextAreas = () => {
      
     
      var  textarea = document.querySelectorAll('textarea');

          textarea.forEach(element => {
             if (element.id == '#target')
              element.disabled = false;
              element.readOnly = false;
         });
         console.log('update executed')
         this.toggleDiv()
;
    }

    //update User Information
   // Executed Through 'Save' Button
    updateUser = event => {
      event.preventDefault()
      if (this.state.newfirstname && this.state.newlastname && this.state.newcellno){
      firestore.collection("User").doc("217004763").update({
          firstname: this.state.newfirstname,
          lastname: this.state.newlastname,
          cellno:this.state.newcellno,
      })
      alert('Your info has been updated')
       }
      else {
         alert('Your info has been updated')
         if (this.state.newfirstname){
            firestore.collection("User").doc("217004763").update({
               firstname: this.state.newfirstname,
           })}
         


         if (this.state.newlastname){
            firestore.collection("User").doc("217004763").update({
               lastname: this.state.newlastname,
           })}
           
         

         if (this.state.newcellno){
            firestore.collection("User").doc("217004763").update({
               cellno : this.state.newcellno,
           })}
            
         }
      console.log(this.state.newfirstname + " " + 'name')
      console.log(this.state.newlastname + " " + 'last name')
      console.log(this.state.newcellno + " " + 'cell no')
      console.log('User Update Executed')
     
      this.setState({
         newfirstname: "",
         newlastname: "",
         newcellno: "", })
  }
   
   
 getData = () => {
      ///Get Data From  'Admin' document from 'User' Collection 
    var docRef = firestore.collection("User").doc("217004763");
    console.log ("getData Function Is Working");
    docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
         let currentData = [];
         currentData.push(doc.data());
         this.setState({ userData: currentData });
         
       
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
    console.log("Error getting document:", error);
     });
   
     /// Get All Documents 
     /*firestore.collection("User").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log(doc.data.length)
      });
  });*/
   }
    
   render() {
      const { 
           newfirstname,
         newlastname,
           newcellno,
          } = this.state;
      return (
         
         <div id="window"className="container">
           
            {this.state.userData.map(data => {
                
                return (
                  <div>
                    
                  <div>
                      <Avatar name={data.firstname + " " + data.lastname} />
                      <span>  </span>
                      <text><b>{(data.firstname + " " + data.lastname)}</b></text>
                  </div>

                  <br />
                  
                   <div>

                   
                      
                  <text>First Name</text>
                  <div>
                  <textarea id="#target" rows="1" cols="35"  disabled= "disabled" readOnly onChange={this.updateInput} name="newfirstname" >
                   {data.firstname}
                  </textarea> 
                  </div>
                 
                  <text>Last Name</text>
                  <div>
                  <textarea id="#target"  rows="1" cols="35"  disabled= "disabled" readOnly onChange={this.updateInput} name="newlastname" >
                   {data.lastname}
                  </textarea> 
                  </div>
                  
      
      
                  <text>Student Email</text>
                  <div>
                  <textarea rows="1" cols="35"  disabled= "disabled" readOnly>
                   {data.studentemail}
                  </textarea> 
                  </div>
      
                  <text>Cell No</text>
                  <div>
                  <textarea id="#target"  rows="1" cols="35"  disabled= "disabled" readOnly onChange={this.updateInput} name="newcellno" >
                  {data.cellno}
                  </textarea> 
                  </div>

                  </div>
                  </div>
                    
                );
               
                })}

            <div>
            <button className="submitButton" onClick={this.enableTextAreas} type="primary"><p6 className="submitButtonText">Update</p6></button>
            </div>

            <div id="updateDiv">
            <button className="submitButton" onClick={this.updateUser} type="primary"><p6 className="submitButtonText">Save</p6></button>
            </div> 

            <br />
            <br />
            <br />
            <br />

              <div>
              <button className="submitButton" onClick={this.generatePDF} type="primary"><p6 className="submitButtonText">Download Testimonial</p6></button>
              </div>
               
         </div>
      );
   }
}

export default Testimonial;