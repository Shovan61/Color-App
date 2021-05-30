import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ColorBox from './ColorBox';
import NavBar from './NavBar';

const styles = {
root: {
height: '100vh',
overflowY: 'scroll',
},
colorBoxes:{
display: 'flex',
flexWrap: 'wrap',
height: '85%', 
},
footer:{
height: '6%',
display: 'flex',
alignItems: 'center',
justifyContent: 'flex-end'
}
};

class SingleColorPalette extends Component {
constructor(props){
super(props);
this.state={format: 'hex'}
this.findShades = this.findShades.bind(this);
this.updateFormat = this.updateFormat.bind(this);
};

findShades(){
let shades = [];
const obj = this.props.palettes.colors;
for(let key in obj){
obj[key].forEach(curObj => {
if(curObj.id === this.props.colorId) {
shades.push(curObj);
};
});
};

return shades.slice(1);

};


updateFormat(newFormat){
this.setState({format: newFormat});
};
    

render() {
 const {classes, palettes, colorId} = this.props;  

return (
    <div className={classes.root}>
        {/* Nav Bar */}
        <NavBar
        updateFormat={this.updateFormat}
        isPalette={false}
        />

        {/* color Shades */}
        <div className={classes.colorBoxes}>
          {this.findShades().map(curObj => (
             <ColorBox
             name={curObj.name}
             background={curObj[this.state.format]}
             isMoreBtn={false}
             key={curObj.name}
             />
          ))}
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

export default withStyles(styles)(SingleColorPalette);
