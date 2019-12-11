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
- Start by cloning project then running the server.
```
git clone git@github.com:marvinhm/robotic-hoover.git

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
