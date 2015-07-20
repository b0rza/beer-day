Orders = new Mongo.Collection("Orders");


Meteor.methods({

  addOrder: function(request){
    var parsedRequest = Meteor.beerDay.parseRequest(request);

    // Ignore if no username specified
    if (!parsedRequest.username) { return; }

    parsedRequest.createdAt = new Date();
    Orders.upsert(
      { username: parsedRequest.username, createdAt: { $gte: Meteor.beerDay.today() } },
      { $set: parsedRequest }
    );
  }
});
