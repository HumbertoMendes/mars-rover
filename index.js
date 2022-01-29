const Rover = require('./classes/Rover');

const rover1 = new Rover('5 5');
rover1.deploy('1 2 N');
rover1.move('LMLMLMLMM');

const rover2 = new Rover('5 5');
rover2.deploy('3 3 E');
rover2.move('MMRMMRMRRM');