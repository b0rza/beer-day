Session.setDefault('showControl', false);

Template.body.helpers({
  showControl: function(){
    return Session.get('showControl');
  }
});

Template.body.helpers({
  foods: function(){
    return Orders.find({
      createdAt: { $gte: Meteor.beerDay.today() },
      food: { $ne: '' }
    });
  },

  drinks: function(){
    return Orders.find({
      createdAt: { $gte: Meteor.beerDay.today() },
      drink: { $ne: '' }
    });
  },

  aggregatedOrders: function () {
    nonEmptyOrders = Orders.find({
      createdAt: { $gte: Meteor.beerDay.today() },
      $or: [{ food: { $ne: "" } }, { drink: { $ne: "" } }]
    });

    return Meteor.beerDay.aggregateOrders(nonEmptyOrders);
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
  },

  "click .togglebutton": function (e) {
    Session.set('showControl', e.target.checked);
  }
});
