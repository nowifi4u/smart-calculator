const OPERATION = { pow: 0, multiply: 1, devide: 2, add: 3, subtract: 4 }

class SmartCalculator {
  constructor(initialValue) {
      this.operations = [[OPERATION.add, initialValue]]
      this.minOperation = OPERATION.add
      return this
  }

  add(number) {
      this.operations.push([OPERATION.add, number])
      return this
  }

  subtract(number) {
      this.operations.push([OPERATION.subtract, number])
      return this
  }

  multiply(number) {
      this.operations.push([OPERATION.multiply, number])
      this.minOperation =  Math.min(OPERATION.multiply, this.minOperation)
      return this
  }

  devide(number) {
      this.operations.push([OPERATION.devide, number])
      this.minOperation = Math.min(OPERATION.devide, this.minOperation)
      return this
  }

  pow(number) {
      this.operations.push([OPERATION.pow, number])
      this.minOperation = OPERATION.pow
      return this
  }

  valueOf() {
      for (let priority = this.minOperation; priority < 3; priority++) {
          for (let i = this.operations.length - 1; i > 0; i--) {
              if (this.operations[i][0] === priority) {
                  switch (priority) {
                      case OPERATION.pow:
                          this.operations[i - 1][1] = Math.pow(this.operations[i - 1][1], this.operations[i][1])
                          break
                      case OPERATION.multiply:
                          this.operations[i - 1][1] *= this.operations[i][1]
                          break
                      case OPERATION.devide:
                          this.operations[i - 1][1] /= this.operations[i][1]
                          break
                  }
                  this.operations.splice(i, 1)
              }
          }
      }
      return this.operations.reduce( function(init, current){
        return (current[0] === OPERATION.add) ? init += current[1] : init -= current[1] 
      }, 0)
  }
}

module.exports = SmartCalculator
