import React, {Component }from 'react';
import{connect} from 'react-redux';
import {fetchPublicDragons} from '../actions/publicDragons';
import {fetchAccountDragons} from '../actions/accountDragon';
import {Link} from 'react-router-dom';
import PublicDragonRow from './PublicDragonRow'


class PublicDragons extends Component {

    componentDidMount(){
        this.props.fetchPublicDragons();
        this.props.fetchAccountDragons();
    }

    render(){

        return (
            <div> 
                <h3>  PUBLIC DRAONGS  </h3>

                <Link to="/">Home Page</Link>
                {
                    this.props.publicDragons.dragons.map(
                        dragon =>{
                            return(
                                <div key = {dragon.dragonId}>
                                      <PublicDragonRow dragon = {dragon} />
                                      <hr />
                                </div>
                            );
                        }
                    )
                }

            </div>
        )

    }

}


export default connect(
    ({publicDragons}) => ({publicDragons}),
    {fetchPublicDragons,fetchAccountDragons}
)(PublicDragons)