Orders = new Mongo.Collection("Orders");


Meteor.methods({

  addOrder: function(request){
    var order = Orders.findOne({
      username: request.username,
      date: new Date().toDateString()
    });

    if(!order){
      Orders.insert({
        username: request.username,
        food: request.food,
        drink: request.drink,
        date: new Date().toDateString()
      });
      return;
    }
    console.log(order._id);

    Orders.update(order._id, { $set: request });
  }
});
