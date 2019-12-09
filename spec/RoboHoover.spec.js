const RobotHoover = require('../src/RoboHoover');

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

  });
  

})