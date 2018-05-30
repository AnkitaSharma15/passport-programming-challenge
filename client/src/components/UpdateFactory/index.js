import React , {Component} from 'react';
import {Form,FormGroup,Col,FormControl,Button} from "react-bootstrap";
import axios from 'axios';

export default class UpdateFactory extends Component{
  constructor(props){
    super(props);

    this.state = {
      factoryName: this.props.pData.factoryName,
      lowerRange: this.props.pData.lowerBound,
      upperRange: this.props.pData.upperBound
    }
  }
  handleInputChange =(e,name) =>{
    this.setState({ [name]: e.target.value });
  }
  handleCreate =(event) =>{
    
    if(this.state.lowerRange < this.state.upperRange){
    let self = this;
    event.preventDefault();
    
    var apiBaseUrl = "http://localhost:8000/api/";
    var payload={
    "factoryName":this.state.factoryName,
    "lowerRange":this.state.lowerRange,
    "upperRange" : this.state.upperRange,
    "pId": this.props.pData.id
    }
    console.log(payload);
    axios.post(apiBaseUrl+'updateFactory', payload)
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else{
    alert("lower range should be less than upper range");
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
      <FormControl type="text" name="factoryName" value={this.state.factoryName} onChange = {(e) => this.handleInputChange(e,'factoryName')}/>
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalLowerBound">
      <Col  sm={2}>
      Lower Bound
      </Col>
      <Col sm={10}>
      <FormControl type="text" name="lowerRange" value={this.state.lowerRange} onChange = {(e) => this.handleInputChange(e,'lowerRange')}/>
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalUpperBound">
      <Col sm={2}>
      Upper Bound
      </Col>
      <Col sm={10}>
      <FormControl type="text" name="upperRange" value={this.state.upperRange} onChange = {(e) => this.handleInputChange(e,'upperRange')}/>
      </Col>
      </FormGroup>


      <FormGroup>
      <Col smOffset={2} sm={10}>
      <Button type="submit" onClick={(event) => this.handleCreate(event)}>Update</Button>
      </Col>
      </FormGroup>
      </Form>
  </div>
    )
  }
}