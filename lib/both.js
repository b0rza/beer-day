Orders = new Mongo.Collection("Orders");


Meteor.methods({

  addOrder: function(request){
    var order = Orders.findOne({
      username: request.username,
      date: new Date().toDateString()
    });

    // Update if order exists
    if (order) {
      request.food = Meteor.beerDay.parseOrder(request.food);
      request.drink = Meteor.beerDay.parseOrder(request.drink);
      Orders.update(order._id, { $set: request });
      return;
    }

    // ... else insert new
    Orders.insert({
      username: request.username,
      food: Meteor.beerDay.parseOrder(request.food),
      drink: Meteor.beerDay.parseOrder(request.drink),
      date: new Date().toDateString()
    });
    return;
  }
});
