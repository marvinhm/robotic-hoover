const RobotHoover = require('../src/RoboHoover').RoboHoover;

describe("RoboHoover", () => {
  let hooverSession;
  beforeEach(() => {
    hooverSession = new RobotHoover();
  });
  describe("hoove", () => {
    it("hoove returns array if given an array", () => {
      let testInput = ["test"];
      expect(hooverSession.hoove(testInput)).toBeInstanceOf(Array);
    });
  });

  describe("gridBuilder", () => {
    it("given the dimensions provided, returns array to represent it ie. (0,0) => gives an array within an array", () => {
      let grid1 = hooverSession.gridBuilder(0, 0);
      expect(grid1.length).toEqual(1);
    });

    it("given the dimensions provided, returns array to represent it ie. (2,2) => gives an array of 3 arrays", () => {
      let grid1 = hooverSession.gridBuilder(2, 2);
      expect(grid1.length).toEqual(3);
    });

    it("given the dimensions provided, returns array to represent it ie. (5,5) => gives an array of 6 arrays", () => {
      let grid1 = hooverSession.gridBuilder(5, 5);
      expect(grid1.length).toEqual(6);
    });
  });

  describe("dirtPlotter", () => {
    it("With 2x2 grid, given location [0, 0], we should return a grid of points [[true, false, false], [false, false, false], [false, false, false]]", () => {
      hooverSession.gridBuilder(2, 2);
      const locationArray = [[0, 1]];
      hooverSession.dirtPlotter(locationArray);

      expect(hooverSession.showGrid()).toEqual([[false, true, false], [false, false, false], [false, false, false]]);
    });


    it("With 5x5 grid, given the dirt locations, we should return a grid of points that match", () => {
      let hooverSession = new RobotHoover();
      hooverSession.gridBuilder(5, 5);
      const locationArray = [[0, 0], [1, 1], [2, 2], [5, 5]];
      hooverSession.dirtPlotter(locationArray);

      expect(hooverSession.showGrid()).toEqual([[true, false, false, false, false, false], [false, true, false, false, false, false], [false, false, true, false, false, false], [false, false, false, false, false, false], [false, false, false, false, false, false], [false, false, false, false, false, true]]);
    });
  });
  
  describe("hooverOrigin", () => {
    it("should plot the hoover on the grid given the location 0,0", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(1, 1);
      hooverSession.hooverOrigin(x, y);

      expect(hooverSession.showGrid()).toEqual([["hooverPresent", false], [false, false]]);
    });

    it("should plot the hoover on the grid given the location 2,0", () => {
      let x = 2;
      let y = 0;
      hooverSession.gridBuilder(3, 3);
      hooverSession.hooverOrigin(x, y);

      expect(hooverSession.showGrid()).toEqual([[false, false, false, false], [false, false, false, false], ["hooverPresent", false, false, false], [false, false, false, false]]);
    });

    it("should plot the hoover on the grid given the location 3,3", () => {
      let x = 3;
      let y = 3;
      hooverSession.gridBuilder(5, 5);
      hooverSession.hooverOrigin(x, y);

      expect(hooverSession.showGrid()).toEqual([[false, false, false, false, false, false], [false, false, false, false, false, false], [false, false, false, false, false, false], [false, false, false, "hooverPresent", false, false], [false, false, false, false, false, false], [false, false, false, false, false, false]]);
    });
  });

  // describe("drive", () => {
  //   it("navigate thought the grid with hoover given location", () => {
  //     let x = 2;
  //     let y = 0;
  //     hooverSession.gridBuilder(2, 2);
  //     hooverSession.hooverOrigin(x, y);

  //     let directions = "N";

  //     hooverSession.drive(directions);
  //     expect(hooverSession.showGrid()).toEqual([[false, false, false], [false, false, false], [false, "hooverPresent", false]]);
  //   })
  // })

  describe("compass", () => {
    it("given a direction North, change hoover location (2,0) to (2,1)", () => {
      let x = 2;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      let directions = "N";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.hooverOriginCoords).toEqual([2, 1]);
    });

    it("given a direction South, change hoover location (1,2) to (1,1)", () => {
      let x = 1;
      let y = 2;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      let directions = "S";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.hooverOriginCoords).toEqual([1, 1]);
    });

    it("given a direction East, change hoover location (0,0) to (1,0)", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(3, 3);
      hooverSession.hooverOrigin(x, y);

      let directions = "E";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.hooverOriginCoords).toEqual([1, 0]);
    });

    it("given a direction West, change hoover location (1,0) to (0,0)", () => {
      let x = 1;
      let y = 0;
      hooverSession.gridBuilder(3, 3);
      hooverSession.hooverOrigin(x, y);

      let directions = "W";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.hooverOriginCoords).toEqual([0, 0]);
    });
  })

})