App = Ember.Application.create();

App.Router.map(function() {
  this.route('clock');
});

App.ClockController = Ember.Controller.extend({
  createdAt: new Date()
});

App.FromNowView = Ember.View.extend({
  tagName: 'time',

  template: Ember.Handlebars.compile('{{view.output}}'),

  currentTick: 0,

  output: function() {
    return moment(this.get('value')).fromNow();
  }.property('value', 'currentTick'),

  didInsertElement: function() {
    this.tick();
  },

  tick: function() {
    var nextTick = Ember.run.later(this, function() {
      console.log('tick');
      this.incrementProperty('currentTick');
      this.tick();
    }, 1000);
    this.set('nextTick', nextTick);
  },

  willDestroyElement: function() {
    var nextTick = this.get('nextTick');
    Ember.run.cancel(nextTick);
  }
});

Ember.Handlebars.helper('fromNow', App.FromNowView);
