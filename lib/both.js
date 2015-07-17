Orders = new Mongo.Collection("Orders");


Meteor.methods({

  addOrder: function(request){
    var parsedRequest = Meteor.beerDay.parseRequest(request);
    parsedRequest.createdAt = new Date();

    Orders.upsert(
      { username: parsedRequest.username, createdAt: { $gte: Meteor.beerDay.today() } },
      { $set: parsedRequest }
    );

    var pipeline = { $group: { $_id: "food", total: { $sum: 1 } } };
  }
});
