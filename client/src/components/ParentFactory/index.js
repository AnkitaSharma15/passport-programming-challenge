import React , {Component} from 'react';
import styles from "./style.css";
import {Button,Glyphicon, Badge, Row, Col} from "react-bootstrap";
import ModalContainer from "../ModalContainer/index";
import axios from 'axios';

import NavBar from  "../NavBar/index";
import socketIOClient from 'socket.io-client';

class ParentFactory extends Component {
    constructor(props) {
        super(props);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        var self = this;
        this.state = {
          show: false,
          clickedModal: "",
          factoryData: [],
          nodeData: {},
          endpoint: "https://morning-bastion-28946.herokuapp.com/api"
         
          
        };
        console.log(this.state);
        const socket = socketIOClient(this.state.endpoint);
        socket.on('message',data => {
          console.log("New data:",data);
          self.setState({
            factoryData: data
          })
        });
        
      }
      componentWillMount() {
        axios.get(`https://morning-bastion-28946.herokuapp.com/api/addFactory`).then(res => {
          const factoryData = res.data;
          this.setState(
            { factoryData },()=>localStorage.setItem("parentdata", JSON.stringify(factoryData))
          );
        });
      }
      
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow(e,data) {
        this.setState({ 
          show: true,
          clickedModal: e.target.id,
          nodeData: data
          
        },()=>console.log(this.state))
      }

      handleDelete =(e,pid)=>{
        e.preventDefault();
        let self =this;
        alert("deleted child nodes");
        var apiBaseUrl = "https://morning-bastion-28946.herokuapp.com/api/";
        var payload={
        "id": pid
        }
        console.log(payload)
        
        axios.post(apiBaseUrl+'deleteFactory', payload)
        .then(function (response) {
          console.log(response);
          self.setState({
              factoryData: response.data
          })
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    render() {
      let dataFactory = JSON.parse(localStorage.getItem("parentdata"));
      console.log(dataFactory);
      
      
        return (
            <div className="container">
            

            <ul className="tree">
           {this.state.factoryData.map(data => 
                
            <li key={data.id} >
            <Row >
            <Col xs={1} md={1}>
              {data.factoryName}
              
              <div>
                    <ul className="tree">
                {data.child.fields.map(cdata => 
                    <li key={cdata.child_id}>
                    <Col>{cdata.nodevalue}</Col>
                    </li>

                )}
              
            </ul>
                    </div>
            </Col>

            <Col xs={3} md={3}>
            <Button onClick={(e)=>this.handleShow(e,data)} id="CHILD_NODE">
                Generate Nodes
              </Button> 

              </Col>
              <Col xs={2} md={2}>
            <Button onClick={(e)=>this.handleShow(e,data)} id="EDIT_NODE">
            <Glyphicon glyph="pencil" />
              </Button> 
              
              </Col>
              <Col xs={2} md={2}>
              
              <Button onClick={(e)=>this.handleDelete(e,data.id)}>
                <Glyphicon glyph="trash" />
              </Button>
             
              </Col>
              <Col xs={2} md={2}>
              
              <Badge>{data.lowerBound} : {data.upperBound}</Badge>
             
              </Col>
              </Row>
            </li>
           )}
            
            {!this.state.show ? '' :
            <ModalContainer show={this.state.show} onHide={this.handleClose} currentModal = {this.state.clickedModal} parentData = {this.state.nodeData}/>
            }
            
          
            
             
           </ul>
           </div>
        );

        
    }
}

export default ParentFactory;