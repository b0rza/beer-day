Session.setDefault('userUid', Meteor.beerDay.guid());

Template.requests.helpers({
  userUid: function(){
    return Session.get('userUid');
  }
});

Template.requests.events({
  // 'keypress '
});
