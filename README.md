# Robotic-hoover

A program that navigates an imaginary robotic hoover (much like a Roomba)
through an equally imaginary room.



## Technologies

* [JS]
* [nodeJS]
* [Express] - For serving the input file
* [Jest] - For unit testing purposes.
* [Common-js] - For module behavior on Web browsers




## Get Started
- Start by running the server
```
node app.js
```

Then run the following commands in the console:

- Start with setting an instance of the RoboHoover class.
```
let roboSession = new RoboHoover();
```

- Here we are loading our data.
```
roboSession.getInput();
```

- Run this step run the hoove session and get results.
```
roboSession.hoove();
```
