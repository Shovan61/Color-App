import React, { Component } from 'react';
import seedColors from './seedColors';
import Palette from './Palette';
import {Switch, Route, Link} from 'react-router-dom';
import {generatePalette} from './colorHelper';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import CreatePalette from './CreatePalette';


class App extends Component {
constructor(props){
super(props);
this.state = {
  palettes: JSON.parse(window.localStorage.getItem('palettes')) || seedColors
};

this.findPalette = this.findPalette.bind(this);
this.newPaletteSave = this.newPaletteSave.bind(this);
this.syncLocalStorage = this.syncLocalStorage.bind(this);
this.deletePalette = this.deletePalette.bind(this);
this.findIds = this.findIds.bind(this);
};

findIds() {
const ids = seedColors.map(curP => curP.id);
return ids;
};

syncLocalStorage(palettes) {
window.localStorage.setItem('palettes', JSON.stringify(palettes));
};

newPaletteSave(newPalette){
this.setState({palettes: [...this.state.palettes, newPalette]}, () => {
  this.syncLocalStorage(this.state.palettes)
});
};

deletePalette(id){
this.setState({palettes: this.state.palettes.filter(curP => curP.id !== id)}, () => {
  this.syncLocalStorage(this.state.palettes);
});
};


findPalette(id){
let palette;
this.state.palettes.forEach(curPalette => {
if(curPalette.id === id){
  palette = curPalette;
};
});

return palette;
};

render() {
  const allIds = this.findIds();
return (
  <div>
     <Switch>
        <Route 
        exact 
        path='/palette/createnewpalette' 
        render={(routeProps) => 
        <CreatePalette 
        palettes={this.state.palettes} 
        newPaletteSave={this.newPaletteSave}
        {...routeProps}
        />
        }
        >          
        </Route>

        <Route 
        exact 
        path='/' 
        render={(routeProps) => <PaletteList 
          palettes={this.state.palettes} 
          {...routeProps}
          deletePalette={this.deletePalette}
          allIds={allIds}
          />
        }
        >
        </Route>
        

        <Route 
        exact 
        path='/palette/:id' 
        render={(routeProps) => 
        <Palette 
        palettes={generatePalette(this.findPalette(routeProps.match.params.id))}
        />
        }
        >        
        </Route>


        <Route 
        exact 
        path='/palette/:paletteId/:colorId' 
        render={(routeProps) => 
        <SingleColorPalette 
        palettes={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
        colorId={routeProps.match.params.colorId}
        />
        }
        > 
        </Route>


     </Switch>
     
  </div>
)
}
};

export default App;

