import React , {Component} from 'react';
import styles from "./style.css";
import {Button,Glyphicon} from "react-bootstrap";

class ParentFactory extends Component {
    render() {
        return (
            <div className= "container">
            <ul className="tree">
            <li>Animals
        
            <Button>
                <Glyphicon glyph="pencil" />
              </Button> 
            </li>
            
          
            
             
           </ul>
           </div>
        );

        
    }
}

export default ParentFactory;