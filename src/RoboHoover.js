function RoboHoover(input) {
  this.hoove = () => {
    return [];
  }

  this.gridBuilder = (xcoord, ycoord) => {
    const newArray = [];
    for(let i = 0; i <= xcoord; i++) {
      newArray.push([]);
    };
    return newArray;
  }

};

module.exports = RoboHoover;


