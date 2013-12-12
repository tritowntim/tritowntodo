
window.TriTownToDo = {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {},
  Config: {},
  Firebase: {Root: new Firebase(app.config.firebase_url)}
}

TriTownToDo.Models.List = Backbone.Model.extend({
  defaults: function() {
    return {
      description: moment().valueOf(),
      complete: false,
      createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
  }
})

TriTownToDo.Collections.Lists = Backbone.Firebase.Collection.extend({
  model:      TriTownToDo.Models.List,
  firebase:   TriTownToDo.Firebase.Root,
  grow:       function() {this.add([new TriTownToDo.Models.List()])}
})

TriTownToDo.Views.Main = Backbone.View.extend({

  events: {
    'click .add' : 'grow'
  },

  el: $('#lists'),

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  template: _.template($('#template-list').html()),

  render: function(x) {
    var html = this.template({stuff: x});
    $('ul', this.$el).append(html);
    return this;
  },

  grow: function(e) {
    e.preventDefault()
    this.collection.grow()
  }
})

var lists = new TriTownToDo.Collections.Lists();
var mainView = new TriTownToDo.Views.Main({collection: lists});
mainView.render();
