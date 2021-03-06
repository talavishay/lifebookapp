var	_fileBrowser= require("./filesCollection.js"),
	dirModel= require("./dirModel.js"),
view	= {
	className : "fileBrowser svgBrowser loader",
	template: require('./filesCompositeView.html'),
	behaviors: [{ behaviorClass: require('../behaviors/toggle.js')},
				{ behaviorClass: require('../behaviors/pager.js')}],
	model : new dirModel(),
	modelEvents : {
		"change" : "render"
	},
	childViewContainer: ".content",
	childView: require('./itemView.js'),  
	collection: new _fileBrowser,
	collectionEvents: {
		"sync": function(e){
					this.$el.removeClass("loader");
					this.render()
		}
	},
	onBeforeShow : function(){
				
		this.listenTo(App.fabricToolsChannel, "dialog:svg", this.toggle);
		this.listenToOnce(App.fabricToolsChannel, "dialog:svg:dirs", function(x,y){
			this.model.set("dirs" , x);
		});
		this.collection.fetch();
	},
	toggle : function(){
		this.$el.find('h3').click();
	},
	events : {
		"click .home" : "homeDir",
		"change select" : "changeDir"
	},
	homeDir : function(ev){
		this.collection.url = App.svg.urlRoot + "_root" +
			App.svg.urlTail;
 
		this.collection.fetch();
	},
	changeDir : function(ev){
		this.collection.url = App.svg.urlRoot+"_"+ev.currentTarget.value +	App.svg.urlTail;
 
		this.collection.fetch();
	}
};
module.exports = App.Marionette.CompositeView.extend(view);
