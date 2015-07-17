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
  },

  parseOrder: function (orderString) {
    return orderString.split(' | ');
  },

  today: function () {
    today = new Date();
    today.setHours(0,0,0,0);
    return today;
  },

  parseRequest: function (request) {
    return {
      food: request.food.split(' | ')[0],
      foodDetails: request.food.split(' | ')[1],
      drink: request.drink.split(' | ')[0],
      drinkDetails: request.drink.split(' | ')[1],
      username: request.username
    }
  }
}
