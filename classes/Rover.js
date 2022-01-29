module.exports = class Rover {
  constructor(limit) {
    const [x = -1, y = -1] = limit.split(' ');

    this.bottom = { x: 0, y: 0 };
    this.top = { x: parseInt(x), y: parseInt(y) };
    this.deployed = false;
  }

  deploy(coordinates) {
    if (this.deployed) throw new Exception('The rover has already been deployed');

    let [x = 0, y = 0, headed = ''] = coordinates.split(' ');
    x = parseInt(x);
    y = parseInt(y);

    if (this._isOutsideBottom(x, y) || this._isOutsideTop(x, y)) throw new Exception('The rover is being deployed outside boundaries.');

    this.coordinates = { x, y, headed };
    this.deployed = true;
  }

  move(instructions) {
    const list = instructions.toUpperCase().split('');
    let { x, y, headed } = this.coordinates;
    let cardinal = this._getCardinalValue(headed);

    list.forEach(item => {
      if (this._isSpin(item)) {
        cardinal = this._getQuadrant(cardinal, item);
      }
      else {
        switch(cardinal) {
          case 0: {
            if (y + 1 <= this.top.y) y++;
            break;
          };
          case 1: {
            if (x - 1 >= this.bottom.x) x--;
            break;
          };
          case 2: {
            if (y - 1 >= this.bottom.y) y--;
            break;
          };
          case 3: {
            if (x + 1 <= this.top.x) x++;
            break;
          };
        }
      }
    });

    this.x = x;
    this.y = y;
    this.headed = this._getCardinalSign(cardinal);

    this._outputPosition();
  }

  _outputPosition() {
    console.log(this.x, this.y, this.headed);
  }

  _isOutsideBottom(x, y) {
    return this.bottom.x > x || this.bottom.y > y;
  }

  _isOutsideTop(x, y) {
    return this.top.x < x || this.top.y < y
  }

  _getQuadrant(cardinal, spin) {
    const spinCardinal = this._getSpinValue(spin);
    let newCardinal = cardinal + spinCardinal;

    if (newCardinal === -1) return 3;
    if (newCardinal === 4) return 0;
    return newCardinal;
  }

  _getSpinValue(headed) {
    switch(headed.toUpperCase()) {
      case 'L': return 1;
      case 'R': return -1;
      default: throw new Error(`Invalid quadrant: ${headed}`);
    }
  }

  _getCardinalValue(value) {
    switch(value) {
      case 'N': return 0;
      case 'W': return 1;
      case 'S': return 2;
      case 'E': return 3;
    }
  }

  _getCardinalSign(value) {
    switch(value) {
      case 0: return 'N';
      case 1: return 'W';
      case 2: return 'S';
      case 3: return 'E';
    }
  }

  _isSpin(value) {
    return value.toUpperCase() === 'L' || value.toUpperCase() === 'R';
  }
}