import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ColorBox from './ColorBox';
import './Colorbox.css';
import NavBar from './NavBar';

const styles = {
root:{
height: '100vh',
overflowy: 'scroll',
},
colors:{
 display: 'flex',
 flexWrap: 'wrap',
 height: '85%',   
},
navbar:{
height: '9%'
},
footer:{
height: '6%',
display: 'flex',
alignItems: 'center',
justifyContent: 'flex-end'
}
};

class Palette extends Component {
constructor(props){
super(props);
this.state = {level: 500, format: 'hex'};
this.updateLevel = this.updateLevel.bind(this);
this.updateFormat = this.updateFormat.bind(this);
};

updateLevel(value){
this.setState({level: value})
};


updateFormat(newFormat){
this.setState({format: newFormat});
};


render() {
const {palettes, classes} = this.props;
const {level} = this.state;
const allColors = palettes.colors[level].map(colorBox => (
   <ColorBox
   name={colorBox.name}
   background={colorBox[this.state.format]}
   key={colorBox.name}
   colorId={colorBox.id}
   paletteId={palettes.id}
   isMoreBtn={true}
   />
));

return (
<div className={classes.root}>
    
    {/* Nav Bar */}
    <div className={classes.navbar}>
       <NavBar
       level={level}
       updateLevel={this.updateLevel}
       updateFormat={this.updateFormat}
       isPalette={true}
       />
    </div>
    {/* all colors */}
    <div className={classes.colors}>
    {allColors}
    </div>

    
    {/* Footer */}
    <div className={classes.footer}>
        <span>{palettes.paletteName}</span>
        <span>{palettes.emoji}</span>
    </div>

</div>
)
}
};

export default withStyles(styles)(Palette);
