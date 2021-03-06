var CompositeView = {
	className : "fileBrowser loader",
	template: require('./compositeTemplate.html'),
	childViewContainer: ".content",
	childView: require('./view.js'),
	collection: App.canvasFiles,
	collectionEvents: {
		"sync": function(e){
			this.$el.removeClass("loader");
		}
	},
	events : {
		"change input" : (ev) => { 
			App.$.each(ev.target.files, function(){
				App.fabricFilesChannel.trigger("file:input:draft", this);
			});
		} 
	},
	//~ onBeforeShow : function(){
		//~ this.collection.fetch();		
	//~ },
	//~ onAttach : function(){
		//~ App.dragDrop(this.el, this._handleDrop);
	//~ },
	//~ _handleDrop : function (files) {
			//~ App.fabricFilesChannel.trigger("file:image:input", files[0]);	
	//~ }
};
module.exports = App.Marionette.CompositeView.extend(CompositeView);
