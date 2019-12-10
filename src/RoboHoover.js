(function(exports){
  function RoboHoover(input) {
    this.inputInfo;
    this.newArray;
    this.hooverOriginCoords;
    this.pastCoords;
    this.futureCoords;
    this.currentCoords;
    this.hooverPresence = "hooverPresent";
    this.cleanCount = 0;

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
      this.newArray[xcoord][ycoord] = this.hooverPresence;
      this.hooverOriginCoords = [xcoord, ycoord];
      this.currentCoords = this.hooverOriginCoords;
      return this.hooverOriginCoords;
    };

    this.compass = (direction, origin) => {
      this.pastCoords = origin;
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
      this.currentCoords = this.futureCoords;
    }



    

    this.drive = (directions) => {
      let cleanCount = 0;
      directions.split('').forEach((direction) => {
        console.log(this.currentCoords);
        this.compass(direction, this.currentCoords);
        this.newArray[this.pastCoords[0]][this.pastCoords[1]] = false;
        // console.log("Next position: ", this.newArray[this.futureCoords[0]][this.futureCoords[1]]);
        if(this.newArray[this.futureCoords[0]][this.futureCoords[1]] == true) {
          this.cleanCount = this.cleanCount + 1;
          
        }
        this.newArray[this.futureCoords[0]][this.futureCoords[1]] = this.hooverPresence;
      });
    };
  
  };

  exports.RoboHoover = RoboHoover;
})(this);
