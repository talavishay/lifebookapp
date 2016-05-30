'use strict';
window.App = {
		log				:function(event){
		if(  !/getActiveObject/.test(event) &&  !/zoom:(in|out)/.test(event) && !/svg:dirs/.test(event) && !/worker:img:mask/.test(event) ){
		//~ if(/caman/.test(event) ){
				var span = App.$('<span class="logText"/>').html(event);
				var msg = App.$('<div/>').append(span),
					log = App.$("#log");
				//~ if(!log.hasClass("active")){
					//~ log.html(msg);
					log.prepend(msg);
					_.delay(function(){
						//self destructing
						msg.hide().remove();
						//~ log.removeClass("active");
					}, 4500);
		}
	},
};
/***********************************************************************
 * 	CORE COMPONETNS
***********************************************************************/
App.Backbone = window.Backbone			= require('backbone');
//TODO: move to specific pouch models..
App.Backbone.Model.prototype.idAttribute = '_id';
App.$= window.Backbone.$= window.jQuery = require('jquery');
App._ = window._ 						= require('underscore');
App.Marionette 							= require('backbone.marionette');
//~ window.PouchDB 							= require('pouchdb');
App.Backbone.LocalStorage				= require('backbone.localstorage');

// jquery dependnt plugins
//~ require('jcrop');
require('jquery-mousewheel')(window.jQuery);
require('spectrum-colorpicker'),
// jquery dependnt plugins ## END
/***********************************************************************
 * backbone Radio setup / App message bus
***********************************************************************/
App.Backbone.Radio 		= require('backbone.radio');
App.fabricFilesChannel	= App.Backbone.Radio.channel('fabricFiles');
App.fabricToolsChannel	= App.Backbone.Radio.channel('fabricTools');
App.layoutChannel		= App.Backbone.Radio.channel('layout');
App.bookChannel		= App.Backbone.Radio.channel('book');
/***********************************************************************
 *	Backbone Plugins
***********************************************************************/
App.Backbone.syphon 	= require('backbone.syphon');
//~ App.Backbone.upload = require('backbone-model-file-upload');
//~ App.Backbone.Hoard		= require('backbone.hoard')
App.BackbonePouch		= require('backbone-pouch');

/***********************************************************************
 * external dependencies 
***********************************************************************/
App.routePattern		= require('route-pattern');
//~ App.await 				= require('await');
//~ App.dataURItoBlob 		= require('./misc/dataURItoBlob.js');
App.fabric 				= require('./components/fabric/fabric.custom.js');
window.PouchDB = require('pouchdb');//~ App.PouchDB.debug.enable('*');
App.PouchDB = window.PouchDB ;
App.blobUtil			= require('blob-util');
App.objectHash			= require('object-hash');
App.screenfull			= require('screenfull');
//~ App.dragDrop			= require('drag-drop');

//TODO: require('./components/jimp');
App.nprogress 			= require('nprogress');
//TODO: this need to go into a "setup" phase ..
App.nprogress.configure({ showSpinner: false });
App.nprogress._onprogress = function(e)  {
	e.lengthComputable ?
		App.nprogress.set((Math.floor((e.loaded/e.total) * 100)) / 100):
		App.nprogress.inc();
};
var layout = require('./components/layout');
App.layout = new layout;//~ view.el : "body" ..
/***********************************************************************
 * internal dependencies / app modules..
 * 
***********************************************************************/
//TODO:  manage the load depnedncies
App.D8models			= require('./components/models/D8models');
//~ App.D8models			= require('./components/models/D8models')(App);
App.models 				=  {};
App.models.files		= require('./components/models/file')(App);
App.models.chapter		= require('./components/models/book/chapters/chapter.js');
App.models.page 		= require('./components/models/book/pages/page.js');
App.models.composition 	= require('./components/models/book/pages/comp.js');
App.collections 		= require('./components/collections')(App);
App.collections.chapters= require('./components/models/book/chapters/index.js');
App.collections.pages	= require('./components/models/book/pages/index.js');
App.collections.pageObjects= require('./components/models/book/chapters/pageObjects/index.js');
//~ App.canvasImages		= new App.collections.canvasImages();
App.files		= new App.collections.files;
App.chapters	= new App.collections.chapters;

// canvas image url resolver
// make sure a local objectUrl as valid for each image in the canvas
App.crop			= require('./components/croper')();
App.resolver		= require('./components/resolver')(App);
//~ App.caman			= require('./components/caman').initialize();
//TODO: ..caman script is loaded in index.html 
//TODO: cleanup namespace _caman / caman 
//~ App._caman				= App.caman.initialize();
require('./components/models/book');
App.chapterResources = require('./components/models/book/chapters/chapterResources.js');
require('./components/user');

/***********************************************************************
 * GLOBAL namespace anchor
***********************************************************************/
var app 				= require('./app')(App);
app.start();
App.Backbone.history.start({root: document.location.pathname});
App.fabricToolsChannel.trigger("dialog:chapterBrowser");
//TODO:  clean up ...
//~ (function() {
	//~ var src = ('https:' === document.location.protocol ? 'https' : 'http') +
		//~ '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	//~
	//~ $.getScript(src, function(data) {
	//~ console.log(data);
	//~ });
//~ })();
