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
  },

  // TODO: refactor this!
  aggregateOrders: function (orders) {
    var aggregatedOrders = {};

    orders.forEach(function(order){

      // Foods
      var item = order.food;
      console.log(item);
      if (item) {
        if(!aggregatedOrders[item]){
          aggregatedOrders[item] = { count: 0, details: [] };
        }

        aggregatedOrders[item].count++;
        order.itemDetails ? aggregatedOrders[item].details.push(order.foodDetails) : false;
      }

      // Drinks
      item = order.drink;
      console.log('+++++++++++++');
      console.log(item);
      if (item) {
        if(!aggregatedOrders[item]){
          aggregatedOrders[item] = { count: 0, details: [] }
        }

        aggregatedOrders[item].count++;
        order.itemDetails ? aggregatedOrders[item].details.push(order.drinkDetails) : false;
      }
    });
    console.log(aggregatedOrders);

    return $.map(aggregatedOrders, function (val, key) {
      return { item: key, details: val.details, count: val.count }
    })
  }
}
