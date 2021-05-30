import React, { Component } from 'react';
import MiniColorPalette from './MiniColorPalette';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';



const styles = {
root: {
height: '100vh',
display: 'flex',
justifyContent: 'center',
overflowY: 'scroll',
},
container: {
    height: '100%',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
  

},
header: {
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
'& h1': {
    fontWeight: '400',
    letterSpacing: '2px'
},
'& a': {
 fontSize: '1.1rem'
}
},
colorPalettes: {
 width: '100%',
 display: 'grid',
 gridTemplateColumns: 'repeat(3, 35%)',
 gap: '5px'
},


};

class PaletteList extends Component {
constructor(props){
super(props);

};

render() {
 const {classes, palettes, history, deletePalette, allIds} = this.props;   
 const miniPaletteList = palettes.map(curP => (
     <MiniColorPalette
     palette={curP}
     name={curP.paletteName}
     emoji={curP.emoji}
     history={history}
     id={curP.id}
     deletePalette={deletePalette}
     allIds={allIds}
     isdeleteShow={allIds.includes(curP.id) ? false : true}
     />
 ));

return (
    <div className={classes.root}>
       <div className={classes.container}>
  
            <div className={classes.header}>
                <h1>Palette List</h1>
                <Link to='/palette/createnewpalette'>
                   <span>Create Palette</span>
                </Link>
            </div>

            {/* Color Lists */}
            <div className={classes.colorPalettes}>
            {miniPaletteList}
            </div>
            
       </div>
    </div>
)
}
};

export default withStyles(styles)(PaletteList);
