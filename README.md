# Robotic-hoover

A program that navigates an imaginary robotic hoover (much like a Roomba)
through an equally imaginary room. 

Taking an input of...

**Room dimensions**: as X and Y coordinates, identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so asthe room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.

**Locations of patches of dirt**: also defined by X and Y coordinates identifying the bottom left corner of those grid positions. An initial hoover position (X and Y coordinates like patches of dirt)

**Driving instructions**: (as cardinal directions) where e.g. N and E mean "go north" and
"go east" respectively).

Program will output:
 - the final position of the hoover after processing all commands.
 - display the number of patches of dirt the robot cleaned up.



## Technologies

* [JS/nodeJS]
* [Express] - For serving the input file
* [Jest] - For unit testing purposes.
* [Common-js] - For module behavior on Web browsers

## Running Tests
- After cloning the project and installing dependancies with npm (see Get Started for this), you can run the tests by typing this in the Command line/Terminal.
```
npm run unit
```


## Get Started
- Start by cloning/setting up project then running the server.
```
git clone git@github.com:marvinhm/robotic-hoover.git

npm install

node app.js
```

Then run the 3 following commands in your browser console:

- Start with setting an instance of the RoboHoover class.
```
let roboSession = new RoboHoover();
```

- Here we are loading our data.
```
roboSession.getInput();
```

- Run this step to start hooving and get your results.
```
roboSession.hoove();
```
