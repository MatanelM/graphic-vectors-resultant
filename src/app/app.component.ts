import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vectors-component';

  vectors = [];
  components = [];
  hasResultant = false;
  resultant = {size: 0, degree: 0};

  addVector(deg, size){
    this.vectors.push({id: Math.round(Math.random()*100), direction: deg.value, size: size.value })
    console.log(this.vectors)
  }
  plus(elem, n){
    elem.value = Number(elem.value) + n
  }
  remove(id){
    if ( id == 100 ){
      this.hasResultant = false;
      this.resultant = {size: 0, degree: 0};
    }
    let ind = this.vectors.indexOf(this.vectors.filter( (elem) => elem.id == id)[0])
    this.vectors.splice(ind, 1);
    try {
      this.components.splice(
        this.components.indexOf(
          this.components.filter( (elem) => elem.id == id )[0]
        ), 1
      )
    }catch{
      console.error('error')
    }
  }
  getResultant(){
    this.getComponents();
    this.hasResultant = true;
    let compX = {size: 0}
    let compY = {size: 0}
    this.components.forEach( (elem, ind) => {
        compX.size += elem.Fx.size;
        compY.size += elem.Fy.size;
    });
    this.resultant.size = Math.round( Math.sqrt(Math.pow(compX.size, 2) + Math.pow(compY.size, 2)) *1000)/1000;
    this.resultant.degree = Math.round(Math.atan( Math.abs((compY.size/compX.size)) )  * (180 / Math.PI) *1000)/1000;
    // resulatnt.degree = (Math.atan( Math.abs((compY.size/compX.size)) ) / Math.PI * 180)
    
    let quarter = this.getQuarter(compX.size, compY.size);
    switch (quarter){
      case 1: break;
      case 2: this.resultant.degree = 180 - this.resultant.degree;break;
      case 3: this.resultant.degree += 180; break;
      case 4: this.resultant.degree = 360 - this.resultant.degree;break;
    }
  }

  getComponents(){
    this.components = [];
    this.vectors.forEach( (elem, ind) => {
        let compX, compY;
        let compXsize = Math.round((elem.size*Math.cos((Math.PI / 180)*elem.direction))*1000)/1000;
        let compXdeg = compXsize < 0 ?
            180
            : 0 ;
        let compYsize = Math.round( (elem.size*Math.sin((Math.PI / 180)*elem.direction)) *1000)/1000;
        let compYdeg = compYsize < 0 ?
            270
            : 90 ;
        compX = {
            size: compXsize,
            degree: compXdeg
        };
        compY = {
            size: compYsize,
            degree: compYdeg
        };
        this.components.push( {id: ind, 'Fx': compX, 'Fy': compY });
    })
    console.log(this.components)
  }


  getQuarter(sizeX, sizeY){
    if ( this.isBetween(sizeX, 0, Infinity) ){
        if ( this.isBetween(sizeY, 0, Infinity) ) return 1;
        else return 4;
    }else{
        if ( this.isBetween(sizeY, 0, Infinity) ) return 2;
        else return 3;
    }
    return 1;
  }
  // util
  isBetween(comp, small, big) {
    return comp >= small && comp < big;
  }
  abs(n){
    return Math.abs(n);
  }
}
