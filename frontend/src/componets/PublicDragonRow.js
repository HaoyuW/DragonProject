import React, {Component }from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux'
import MatingOptions from './MatingOption'
import history from '../history';
import {BACKEND} from '../config';



class PublicDragonRow extends Component{

    state ={displayMatingOptions: false};

    toggleMatingOptions = () =>{
          this.setState({
                displayMatingOptions :!this.state.displayMatingOptions
          });
    }
    
    buy =()=>{
          const {dragonId,saleValue} = this.props.dragon;

          fetch(`${BACKEND.ADDRESS}/dragon/buy`,{
               method: 'POST',
               credentials: 'include',
               headers:{'Content-Type' : 'application/json'},
               body: JSON.stringify({dragonId,saleValue}) 
          })
          .then(response => response.json())
          .then(json =>{
                alert(json.message);
                if(json.type != 'error'){
                  history.push('/AD');
                }
                
          })
          .catch(error =>alert(error.message));
    }

    render() {

          return (
            <div>
                  <div> {this.props.dragon.nickname }</div>
                  <DragonAvatar dragon ={this.props.dragon}/>
                  <div> 
                       <span> SaleValue:{this.props.dragon.saleValue }</span> {'|'}
                       <span> SaleValue:{this.props.dragon.sireValue }</span> {''}
                  </div>
                  <br />
                  <Button onClick={this.buy}>BUY</Button> { '   '} <Button onClick={this.toggleMatingOptions}>Sire</Button>
                  <br />
                  {
                        this.state.displayMatingOptions ?
                         <MatingOptions patronDragonId ={this.props.dragon.dragonId}/>:
                         <div></div>
                  }
            </div>
          );
      }
}



export default PublicDragonRow;