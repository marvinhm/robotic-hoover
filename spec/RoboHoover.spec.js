const RobotHoover = require('../src/RoboHoover');

describe("RoboHoover", () => {
  let hooverSession;
  beforeEach(() => {
    hooverSession = new RobotHoover();
  });
  it("hoove returns array if given an array", () => {
    let testInput = ["test"];
    expect(hooverSession.hoove(testInput)).toBeInstanceOf(Array);
  });
})