// if running tests please uncomment the following line
// const fetch = require('node-fetch');

(function(exports){
  function RoboHoover() {
    this.inputInfo;
    this.newArray;
    this.hooverOriginCoords;
    this.pastCoords;
    this.futureCoords;
    this.currentCoords;
    this.hooverPresence = "hooverPresent";
    this.cleanCount = 0;
    this.txt;

    this.showGrid = () => {
      return this.newArray;
    }
    this.hoove = () => {
      let input = this.txt;
      let xDimension = input[0][0];
      let yDimension = input[0][1];
      let initialXPosition = input[1][0];
      let initialYPosition = input[1][1];
      let dirtPatchArray = [];
      let drivingInstuctions = input[(input.length-1)].join();
      let result;

      for(let i=2; i<input.length-1; i++) {
        dirtPatchArray.push(input[i]);
      }

      this.gridBuilder(xDimension, yDimension);
      this.hooverOrigin(initialXPosition, initialYPosition);
      this.dirtPlotter(dirtPatchArray);
      this.drive(drivingInstuctions);
      result = this.currentCoords.join(',') + '\n' + this.cleanCount;
      return result;
    }
    this.getInput = async () => {
      let targetUrl = 'http://localhost:5555/';
      let inputArray = [];
      await fetch(targetUrl).then(function(response) {
        response.text().then(function(data) {
          data.split("\n").forEach((item) => {

            if(item.split(',').length == 2) {
              inputArray.push([ parseInt(item.split(',')[0]), parseInt(item.split(',')[1])] );
            } else {
              inputArray.push(item.split(','));
            }
          });
        });
      });
      this.txt = inputArray;
      return inputArray;
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
      directions.split('').forEach((direction) => {
        this.compass(direction, this.currentCoords);
        this.newArray[this.pastCoords[0]][this.pastCoords[1]] = false;
        if(this.newArray[this.futureCoords[0]][this.futureCoords[1]] == true) {
          this.cleanCount = this.cleanCount + 1;
          
        }
        this.newArray[this.futureCoords[0]][this.futureCoords[1]] = this.hooverPresence;
      });
    };
  
  };

  exports.RoboHoover = RoboHoover;
})(this);




let Robo = require('./RoboHoover').RoboHoover;
let r1 = new Robo();

r1.getInput();