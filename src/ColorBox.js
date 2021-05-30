import React, { Component } from 'react';
import chroma from 'chroma-js';
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import sizes from './sizes';


// props => props.isMoreBtn ? '50%' : '25%',

const styles = {   
root:{

backgroundColor: props => props.background,
display: 'inline-block',
height: props => props.isMoreBtn ? '25%' : '50%',
width: '20%',
"&:hover button":{
    opacity: '1',
    transition: 'opacity 0.2s ease-in'
},
'@media (max-width: 991.98px)':{
height: props => props.isMoreBtn ? '25%' : '50%',
width: '20%'
},

'@media (max-width: 767.98px)':{
height: props => props.isMoreBtn ? '10%' : '50%',
width: '50%'
},
'@media (max-width: 575.98px)':{
height: props => props.isMoreBtn ? '5%' : '8%',
width: '100%'
},

},
name:{
position: 'relative',
top: props => props.isMoreBtn ? '163px' : '345px',
left: '3px',
color: props => chroma(props.background).luminance() > 0.09 ? 'black' : 'white',
},
btn:{
backgroundColor:'rgba(255, 255, 255, 0.4)',
borderRadius:'28px',
border:'none',
color: props => chroma(props.background).luminance() > 0.09 ? 'black' : 'white',
cursor:'pointer',
fontFamily:' Arial',
padding:'8px 25px',
textDecoration:'none',
textShadow:'0px 1px 0px #2f6627',
position: 'relative',
top: props => props.isMoreBtn ? '70px' : '170px',
left: '3px',
"&:active": {
position: 'relative',
top:  props => props.isMoreBtn ? '72px' : '172px',
},
opacity: '0'
},
btnContainer: {
position: 'relative',
bottom: '10px',
left: '80px',
height: '100%'
},
seeMore: {
width: '13%',
backgroundColor:'rgba(255, 255, 255, 0.4)',
padding: '5px 7px',
borderRadius:'28px',
position: 'relative',
bottom: '50px',
left: '205px',
cursor: 'pointer',
"&:hover": {
transform: 'scale(1.04)',
cursor: 'pointer',
}
},
overlayHeader:{
    fontSize: '3rem',
    fontWeight: '400',
    letterSpacing: '5px',
    color: props => chroma(props.background).luminance() > 0.09 ? 'black' : 'white',
},
overlayBottom:{
    fontSize: '1.5rem',
    color: props => chroma(props.background).luminance() > 0.09 ? 'black' : 'white',
},

};



class ColorBox extends Component {

constructor(props){
super(props);
this.state = {isCopied: false}
this.handleCopy = this.handleCopy.bind(this);
};
 
handleCopy(){
this.setState({isCopied: true}, () => {
setTimeout(() => {
    this.setState({isCopied: false})
}, 1500);
});
};

render() {
const {name, background, classes, paletteId, colorId, isMoreBtn} = this.props;
const {isCopied} = this.state;

return (
<div className={classes.root}>
    {/* Overlay */}
    <div 
    style={{backgroundColor: background}} 
    className={`overlay ${isCopied && 'show'}`}
    />

    {/* overlat text */}
    <div className={`overlay-text ${isCopied && 'show'}`}>
       <h1 className={classes.overlayHeader}>COPIED!</h1>
       <p className={classes.overlayBottom}>{background}</p>
    </div>

    {/* Name */}
    <span className={classes.name}>{name}</span>
     

    {/* Button */}
 
        <CopyToClipboard text={background} onCopy={this.handleCopy}>
            <div className={classes.btnContainer}>
            <button className={classes.btn}>
            COPY
            </button>  
            </div>  
        </CopyToClipboard>


 

     {/* See More */}

     {isMoreBtn && (
     <Link 
     style={{textDecoration: 'none', color: 'inherit'}} 
     to={`/palette/${paletteId}/${colorId}`}
     >
       <span className={classes.seeMore}>More</span> 
     </Link>
     )}

     
      

    
</div>
)
}
};

export default withStyles(styles)(ColorBox);

