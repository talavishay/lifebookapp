var view = {
	tagName : "div",
	className : "page",
	template : require('./page.html'),
	//~ model : require ('./page.js'),
	modelEvents : {
		"change:meta" : "render",
		"change:active" : "render",
	},
	//~ collectionEvents: {
		//~ "all": "render"
	//~ },
	onRender : function(){
		this.$el.find(".pageNumber").text(App.pages.indexOf(this.model)+1);
	},
	events : {
		"click .moveUp" :"movePageUp",
		"click .moveDown" :"movePageDown",
		//~ "click .moveDown" :"_prev",
		'click [data-active="false"]'	: "_click",
		'click [data-active="true"]'	: "_save",
		
		
	},
	movePageUp: function(){
		App.pages.moveUp(this.model);
	},
	movePageDown: function(){
		App.pages.moveDown(this.model);
		
	},
	_click: function(ev){
		if(ev.shiftKey){
			this._save();
		};
		if(ev.ctrlKey){
			//~ this.model.destroy();
		} else {
			App.fabricToolsChannel.trigger("set:stage", this.model);
			this.model.collection.invoke("set",{active : false});
			this.model.set({active : true});
			
		}
	},
	_save : function(){
		//~ var id = this.model.id,
			//~ format = '?_format=json',
			//~ _url =  isNaN(parseInt(id)) ?
				//~ '/entity/composition' + format :
				//~ '/lifebook/composition/'+ id + format;
			
		this.model._save();
	},
};
module.exports = App.Marionette.ItemView.extend(view);
