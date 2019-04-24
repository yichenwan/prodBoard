var makeCounter = function() {
  var counter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    value: function() {
      return counter;
    }
  }  
};

module.exports = makeCounter;