import React , {Component} from 'react';
import ModalContainer from "../ModalContainer/index";
import {Button} from "react-bootstrap";

export default class RootNode extends Component {
    constructor(props) {
        super(props);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };
      }
    

      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true }); 
      }
    render(){
        return(
            <div>
<Button onClick={this.handleShow}>
               Create Factory
              </Button> 
            <ModalContainer show={this.state.show} onHide={this.handleClose} currentModal = "CREATE_FACTORY" handleTest = {this.props.handleTest}/>
            </div>
        )
    }
}