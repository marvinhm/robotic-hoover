const RobotHoover = require('../src/RoboHoover').RoboHoover;

describe("RoboHoover", () => {
  let hooverSession;
  beforeEach(() => {
    hooverSession = new RobotHoover();
  });
  describe("hoove", () => {
    it("hoove returns string", () => {

      let testInput = [[5,5], [1,2], [1,0], [2,2], [2,3], ["NNESEESWNWW"]];
      const mockCallback = jest.fn(x => testInput);
        hooverSession.getInput([0, 1], mockCallback);

      expect(hooverSession.hoove()).toBeInstanceOf(Array);
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

  describe("compass", () => {
    it("given a direction North and current location of (2,0), the next laction of the hoover should be (2, 1)", () => {
      let x = 2;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      let directions = "N";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.futureCoords).toEqual([2, 1]);
    });

    it("given a direction South and current location of (1,2), the next laction of the hoover should be (1,1)", () => {
      let x = 1;
      let y = 2;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      let directions = "S";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.futureCoords).toEqual([1, 1]);
    });

    it("given a direction East and current location of (0,0), the next laction of the hoover should be (1,0)", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(3, 3);
      hooverSession.hooverOrigin(x, y);

      let directions = "E";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.futureCoords).toEqual([1, 0]);
    });

    it("given a direction West and current location of (1,0), the next laction of the hoover should be (0,0)", () => {
      let x = 1;
      let y = 0;
      hooverSession.gridBuilder(3, 3);
      hooverSession.hooverOrigin(x, y);

      let directions = "W";

      hooverSession.compass(directions, hooverSession.hooverOriginCoords);
      expect(hooverSession.futureCoords).toEqual([0, 0]);
    });
  });

  describe("drive", () => {
    describe("update past and future values", () => {
      it("given North and origin (0,0), hoover should leave it's previous location clean (false) and move", () => {
        let x = 0;
        let y = 0;
        hooverSession.gridBuilder(2, 2);
        hooverSession.hooverOrigin(x, y);

        hooverSession.drive("N");

        expect(hooverSession.showGrid()).toEqual([[false, "hooverPresent", false], [false, false, false], [false, false, false]]);
      });

      it("given South and origin (2,2), hoover should leave it's previous location clean (false) and move", () => {
        let x = 2;
        let y = 2;
        hooverSession.gridBuilder(2, 2);
        hooverSession.hooverOrigin(x, y);

        hooverSession.drive("S");

        expect(hooverSession.showGrid()).toEqual([[false, false, false], [false, false, false], [false, "hooverPresent", false]]);
      });

      it("given Eeast and origin (0,0), hoover should leave it's previous location clean (false) and move", () => {
        let x = 0;
        let y = 0;
        hooverSession.gridBuilder(2, 2);
        hooverSession.hooverOrigin(x, y);

        hooverSession.drive("E");

        expect(hooverSession.showGrid()).toEqual([[false, false, false], ["hooverPresent", false, false], [false, false, false]]);
      });

      it("given West and origin (2,2), hoover should leave it's previous location clean (false) and move", () => {
        let x = 2;
        let y = 2;
        hooverSession.gridBuilder(2, 2);
        hooverSession.hooverOrigin(x, y);

        hooverSession.drive("W");

        expect(hooverSession.showGrid()).toEqual([[false, false, false], [false, false, "hooverPresent"], [false, false, false]]);
      });
    });
  });

  describe("cleanCount", () => {
    it("should have a count of one after one hoover movement", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      const locationArray = [[0, 1]];
      hooverSession.dirtPlotter(locationArray);

      hooverSession.drive("N");


      expect(hooverSession.cleanCount).toEqual(1);
    });

    it("should have a count of zero after one hoover movement", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      const locationArray = [[0, 2]];
      hooverSession.dirtPlotter(locationArray);

      hooverSession.drive("N");


      expect(hooverSession.cleanCount).toEqual(0);
    });

    it("should have a count of two after two hoover movement", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      const locationArray = [[0, 1], [0, 2]];
      hooverSession.dirtPlotter(locationArray);
      
      hooverSession.drive("NN");



      expect(hooverSession.cleanCount).toEqual(2);
    });

    it("should have a count of three after three hoover movement", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      const locationArray = [[0, 1], [0, 2], [1, 2]];
      hooverSession.dirtPlotter(locationArray);
      
      hooverSession.drive("NNE");



      expect(hooverSession.cleanCount).toEqual(3);
    });

    it("should have a count of four after four hoover movement", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      const locationArray = [[0, 1], [0, 2], [1, 2], [1, 1]];
      hooverSession.dirtPlotter(locationArray);
      
      hooverSession.drive("NNES");



      expect(hooverSession.cleanCount).toEqual(4);
    });

  });

  describe("Final Position", () => {
    it("Return last position after the last dirt location", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(2, 2);
      hooverSession.hooverOrigin(x, y);

      const locationArray = [[0, 1], [0, 2], [1, 2], [1, 1]];
      hooverSession.dirtPlotter(locationArray);
      
      hooverSession.drive("NNES");

      expect(hooverSession.currentCoords).toEqual([1,1]);
    });
  });


  describe("Final Position", () => {
    it("Return last position after the last dirt location", () => {
      let x = 0;
      let y = 0;
      hooverSession.gridBuilder(5, 5);
      hooverSession.hooverOrigin(x, y);

      const locationArray = [[0, 1], [0, 2], [1, 2], [1, 1], [5,5]];
      hooverSession.dirtPlotter(locationArray);
      
      hooverSession.drive("NNES");

      expect(hooverSession.currentCoords).toEqual([1,1]);
    });
  });


})