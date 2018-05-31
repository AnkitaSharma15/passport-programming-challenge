import React , {Component} from 'react';
import {Form,FormGroup,Col,FormControl,Button} from "react-bootstrap";
import axios from 'axios';

class CreateFactory extends Component{

  constructor(props){
    super();
    this.state = {
      factoryName: '',
      lowerRange: '',
      upperRange: ''
    }
  }
  handleInputChange =(e,name) =>{
    this.setState({ [name]: e.target.value });
  }
  handleCreate =(event) =>{
    console.log(this.state);
    if(this.state.lowerRange < this.state.upperRange){
    let self = this;
    event.preventDefault();
    
      var apiBaseUrl = "https://morning-bastion-28946.herokuapp.com/api/";
      var payload={
      "factoryName":this.state.factoryName,
      "lowerRange":this.state.lowerRange,
      "upperRange" : this.state.upperRange
      }
      console.log(payload);
      axios.post(apiBaseUrl+'addFactory', payload)
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });
      }
      else{
        alert("Lower range should be less than upper range");
      }
 
  }
    
  
  render(){
    return(
      <div>
            <Form horizontal>
      <FormGroup controlId="formHorizontalName">
      <Col  sm={2}>
      Factory Name
      </Col>
      <Col sm={10}>
      <FormControl type="text" name="factoryName" placeholder="Name" onChange = {(e) => this.handleInputChange(e,'factoryName')} required/>
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalLowerBound">
      <Col  sm={2}>
      Lower Bound
      </Col>
      <Col sm={10}>
      <FormControl type="text" name="lowerRange" placeholder="Lower Bound" onChange = {(e) => this.handleInputChange(e,'lowerRange')} required/>
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalUpperBound">
      <Col sm={2}>
      Upper Bound
      </Col>
      <Col sm={10}>
      <FormControl type="text" name="upperRange" placeholder="Upper Bound" onChange = {(e) => this.handleInputChange(e,'upperRange')} required/>
      </Col>
      </FormGroup>


      <FormGroup>
      <Col smOffset={2} sm={10}>
      <Button type="submit" onClick={(event) => this.handleCreate(event)}>Create</Button>
      </Col>
      </FormGroup>
      </Form>
  </div>
    )
  }
}




export default CreateFactory;