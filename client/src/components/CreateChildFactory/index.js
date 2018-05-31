import React , {Component} from 'react';
import {Form,FormGroup,Col,FormControl,Button} from "react-bootstrap";
import axios from 'axios';

class CreateChildFactory extends Component{
  constructor(props){
    super(props);

    this.state ={
      count: 0,
      min: this.props.pData.lowerbound,
      max: this.props.pData.upperbound,
      
    }
    
  }

  handleInputChange =(e,name) =>{
    this.setState({ [name]: e.target.value});
  }

  handleGenerate =(e)=>{
    if(this.state.count <= 15){
      var self = this;
      console.log(this.state.childValue);
      e.preventDefault();
      alert("added child nodes");
      var apiBaseUrl = "https://morning-bastion-28946.herokuapp.com/api/";
      var payload={
      "count":this.state.count,
      "pId": this.props.pData.id,
      
      "min": this.state.min,
      "max": this.state.max
      }
      console.log(payload);
      axios.post(apiBaseUrl+'addChild', payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      alert("Child nodes can be generated only upto 15 !!");
    }
   
    }
   
  

  render(){
    
    return(
      <div>
            <Form horizontal>
              <FormGroup controlId="formHorizontalChild">
                <Col  sm={2}>
                  No. of Child Nodes
                 
                </Col>
                <Col sm={10}>
                  <FormControl type="number"  name ="count" onChange = {(e) => this.handleInputChange(e,'count')}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit" onClick={(event) => this.handleGenerate(event)}>Generate</Button>
                </Col>
              </FormGroup>
            </Form>
        </div>
    )
  }
}




export default CreateChildFactory;