import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Colorbox.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
root: {
display: 'flex',
alignItems: 'center',
width: '100%',
justifyContent: 'space-between',
},
logoSlider:{
width: '60%',
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
},
logo: {
cursor: 'pointer',
height: '100%',
display: 'flex',
width: '30%',
alignItems: 'center',
justifyContent: 'center',
alignSelf: 'flex-start',
backgroundColor: '#444',
'& h1':{
color: 'white',
fontWeight: '400',
letterSpacing: '3px', 
}
},
sliderContainer: {
width : '60%',
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
"& span": {
fontSize: '1.2rem',
fontfamily: 'arial'
}
},
slider: {
    width: '70%',
   
},
select: {
marginRight: '40px'
},

};

class NavBar extends Component {
constructor(props){
super(props)    ;
this.state = {level : this.props.level, format: 'hex', isSnackbarOpen: false}
this.handleLevelChange = this.handleLevelChange.bind(this);
this.handleSelectChange = this.handleSelectChange.bind(this);
this.handleSnackClose = this.handleSnackClose.bind(this);
};

handleLevelChange(newlevel){
this.setState({level: newlevel}, () => {
this.props.updateLevel(this.state.level);
});
};


handleSelectChange(e){
this.setState({format: e.target.value, isSnackbarOpen: true}, 
() => {this.props.updateFormat(this.state.format);});

};

handleSnackClose(){
this.setState({isSnackbarOpen: false});
};


render() {
const {classes, isPalette} = this.props;
const {level, format, isSnackbarOpen} = this.state;
return (
    <div className={classes.root}>
        {/* Logo */}
        <div className={classes.logoSlider}>
            
            <div className={classes.logo}>
                <Link style={{textDecoration: 'none'}} to='/'>
                  <h1>React Color</h1>
                </Link> 
            </div>


    {/* Slider */}
    {isPalette && (
        <div className={classes.sliderContainer}>
        <span>Level:- {level}</span>
        <Slider 
        className={classes.slider}
        defaultValue={this.state.level}
        min={100}
        max={900}
        step={100}
        onChange={this.handleLevelChange}
        railStyle={{
            height: 2
            }}
            handleStyle={{
            height: 20,
            width: 20,
            marginLeft: -10,
            marginTop: -10,
            backgroundColor: "green",
            border: 0
            }}
            trackStyle={{
            background: "none"
            }}
        />
        </div>
    )}


        </div>




{/* Select */}
       <div className={classes.select}>
        <Select
        value={format}
        onChange={this.handleSelectChange}
        >
            <MenuItem value='hex'>HEX #ffffff</MenuItem >
            <MenuItem value='rgb'>RGB rgb(255, 255, 255)</MenuItem >
            <MenuItem value='rgba'>RGBA rgba(255, 255, 255, 0.1)</MenuItem >
        </Select>
       </div>


{/* Snack Bar */}
        <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={this.handleSnackClose}
        message="Format changed"
        action={
            <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
            </React.Fragment>
        }
        />


</div>
)
}
};

export default withStyles(styles)(NavBar);
