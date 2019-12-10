(function(exports){
  function RoboHoover(input) {
    this.inputInfo;
    this.newArray;
    this.hooverOriginCoords;
    this.pastCoords;
    this.futureCoords;

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
      this.newArray;
      dirtArray.forEach((coords) => {
        this.newArray[coords[0]][coords[1]] = true;
      })
    };

    this.hooverOrigin = (xcoord, ycoord) => {
      this.newArray[xcoord][ycoord] = "hooverPresent";
      return this.hooverOriginCoords = [xcoord, ycoord];
    };

    this.compass = (direction, origin) => {
      this.pastCoords = origin;
     
      this.futureCoords;
      if(direction == "N") {
        this.futureCoords = [origin[0], origin[1]+1];
      } else if(direction == "S") {
        this.futureCoords = [origin[0], origin[1]-1];
      } else if(direction == "E") {
        this.futureCoords = [origin[0]+1, origin[1]];
      } else if(direction == "W") {
        this.futureCoords = [origin[0]-1, origin[1]];
      } else {
        console.log("Error");
      }
    }



    

    this.drive = (directions) => {
      let directionsArray = directions.split('');

      directionsArray.forEach((direction) => {
        this.compass(direction);

      })
    };
  
  };

  exports.RoboHoover = RoboHoover;
})(this);
