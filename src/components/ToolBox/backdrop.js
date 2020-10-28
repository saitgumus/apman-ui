import React, {Component} from 'react';
import {Backdrop, CircularProgress} from "@material-ui/core";
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        backdropStatus: state.backdropStatusReducer,
    };
}

class BackdropComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open : false
        }
    }
    
    
    render() {
        return (
            <React.Fragment>
                <Backdrop
                    open={!!(this.props.backdropStatus && this.props.backdropStatus === true)}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(BackdropComponent);
