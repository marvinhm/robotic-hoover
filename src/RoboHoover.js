(function(exports){
  function RoboHoover(input) {
    this.inputInfo;
    this.newArray;
    this.showGrid = () => {
      return this.newArray;
    }
    this.hoove = () => {
      return [];
    }
    this.getInput = () => {
      let myData = fetch("../input.csv")
      .then(data => {
        data
      });
      console.log(myData);
    }
  
    this.gridBuilder = (xcoord, ycoord) => {
      this.newArray = [];
      let yArray = [];
      for(let i = 0; i <= xcoord; i++) {
        for(let j = 0; j <= ycoord; j++) {
          yArray.push(false);
        }
        this.newArray.push(yArray);
        yArray = [];
      };

      return this.newArray;
    }

    this.dirtPlotter = (dirtArray) => {
      this.newArray
      dirtArray.forEach((coords) => {
        this.newArray[coords[0]][coords[1]] = true;
      })
    }
  
  };

  exports.RoboHoover = RoboHoover;
})(this);
