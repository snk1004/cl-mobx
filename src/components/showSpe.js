import React from 'react'
import '../index.css'
import './comp.css'
class Spe extends React.Component {
    state = {
    
    };
    render() {
        return (
            <div className='show_spe'>
                {this.props.spe}
            </div>
        );
    }
}


export default Spe;