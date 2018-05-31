import React , {Component} from 'react';
import {Modal, Button} from "react-bootstrap";
import CreateFactory from "../CreateFactory/index";
import CreateChildFactory from "../CreateChildFactory/index";
import UpdateFactory from "../UpdateFactory/index";

export default class ModalContainer extends Component {
    constructor(props){
        super(props);
       console.log(props.parentData)
        
    }
    
    selectedModal=(cmodal)=>{
        console.log(cmodal);
        switch (cmodal) {
            case 'CREATE_FACTORY':
              return <CreateFactory pData = {this.props.parentData} />;
        
            case 'CHILD_NODE':
              return <CreateChildFactory pData = {this.props.parentData} />;
        
            case 'EDIT_NODE':
                return <UpdateFactory pData = {this.props.parentData}/>;
        
            default:
              return <UpdateFactory pData = {this.props.parentData}/>;
          }
    }
    render(){
        
        return(
            <div> 
                 <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          container={this}
          aria-labelledby="contained-modal-title"

        >
                <Modal.Header>
          </Modal.Header>
          <Modal.Body>
            {this.selectedModal(this.props.currentModal)}
              </Modal.Body>
              <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
          </Modal>
                </div>
        )
    }
}