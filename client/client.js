Session.setDefault('userUid', Meteor.beerDay.guid());

Template.request.helpers({
  userUid: function(){
    return Session.get('userUid');
  }
});

Template.body.helpers({
  foods: function(){
    return Orders.find({
      createdAt: { $gt: Meteor.beerDay.today() } ,
      food: { $ne: '' }
    });
  },

  drinks: function(){
    return Orders.find({
      createdAt: { $gt: Meteor.beerDay.today() } ,
      drink: { $ne: '' }
    });
  },

  all: function(){
    return Orders.find({}, { sort: { createdAt: -1 } });
  }
});

Template.body.events({
  "keypress input": function (e) {
    if(e.which == 13){
      var request = {}
      $('.requestForm').serializeArray().map(function(x){ request[x.name] = x.value; });
      Meteor.call('addOrder', request);
    }
  }
});
