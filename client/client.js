Session.setDefault('userUid', Meteor.beerDay.guid());

Template.request.helpers({
  userUid: function(){
    return Session.get('userUid');
  }
});

Template.body.helpers({
  foods: function(){
    return Orders.find({
      date: new Date().toDateString(),
      food: { $ne: '' }
    });
  },

  drinks: function(){
    return Orders.find({
      date: new Date().toDateString(),
      drink: { $ne: '' }
    });
  },

  all: function(){
    console.log(Orders.find({}));
    return Orders.find({});
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
