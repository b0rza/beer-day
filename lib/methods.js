// Helper functions
var s4 = function () {
  return Math.floor((1 + Math.random(new Date())) * 0x10000)
    .toString(16)
    .substring(1);
}

// Core beer-day methods
Meteor.beerDay = {
  guid: function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
