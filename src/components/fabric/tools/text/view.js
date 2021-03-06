var _state =require('./state.js'),
	autosize = require('autosize'),
textToolsView = {
	className : 'toolbox text',
	template: require('./template.html') ,
	initialize :function(object){
		this.model 	= new _state(object);
	},
	behaviors: [
		{ behaviorClass: require('../objectBehaviour.js')}
	],
	ui		:{
		bold			: ".B",
		italic			: ".I",
		textAlignLeft 	: ".textAlignLeft",
		textAlignRight 	: ".textAlignRight",
		textAlignCenter : ".textAlignCenter",
		fontColor 		: ".textColor",
		fontSize 		: ".fontSize",
		textOpacity 	: ".textOpacity",
		strokeWidth 	: ".strokeWidth",
		textStroke 		: ".textStroke",
		textBackgroundColor : ".textBackgroundColor",
		fontFamily		: ".fontFamily",
		lineHeight		: ".lineHeight",
		underline		: ".U",
		editor			: ".editor"
	},
	events 	:{
		'click @ui.underline'	: 'underline',
		'click @ui.bold'		: 'bold',
		'click @ui.italic'		: 'italic',
		'click @ui.textAlignLeft' : "setTextAlignLeft",
		'click @ui.textAlignRight' : "setTextAlignRight",
		'click @ui.textAlignCenter' : "setTextAlignCenter",
		'input @ui.textOpacity'	: 'setTextOpacity',
		'change @ui.fontSize'	: 'setfontSize',
		'change @ui.fontFamily'	: 'setFontFamily',
		'change @ui.lineHeight'	: 'setLineHeight',
		'click @ui.textStroke'	: 'setTextStroke',
		'change @ui.strokeWidth': 'setTextStrokeWidth',
		'mouseup @ui.textBackgroundColor' : 'setTextBackgroundColor',
		'mouseup @ui.fontColor'	: 'setFontColor',
		'input @ui.editor'		: 'edit'
	},
	modelEvents: {
        'change': 'refreshView'
    },
    
    onAttach : function(ev){
		autosize(this.ui.editor);
	},
    edit : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject');
		obj.text = ev.currentTarget.value
		App.fabricToolsChannel.trigger('renderall');
	},
    refreshView: function() {
        this.render();
    },
	_style : function(key, val){
			var obj = App.fabricToolsChannel.request('getActiveObject');;
			var isStyled = (this.getStyle(obj, key) || '').indexOf(val) > -1;
			this.setStyle(obj, key, isStyled ? '' : val);
			App.fabricToolsChannel.trigger('renderall');
	},
	underline : function(a){
			this._style('textDecoration', "underline");			
	},
	bold : function(a){
			this._style('fontWeight', "bold");
	},
	italic : function(a){
			this._style('fontStyle', "italic");
	},
	setTextAlignRight : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject');;
		obj.setTextAlign("right");
		App.fabricToolsChannel.trigger('renderall');
	},
	setTextAlignCenter : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject');;
		obj.setTextAlign("center");
		App.fabricToolsChannel.trigger('renderall');
	},
	setTextAlignLeft : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject');;
		obj.setTextAlign("left");
		App.fabricToolsChannel.trigger('renderall');
	},
	setTextOpacity : function(a){
			var obj = App.fabricToolsChannel.request('getActiveObject');;
				obj.setFill(tinycolor(obj.getFill()).setAlpha(a.target.value).toRgbString());
				App.fabricToolsChannel.trigger('renderall');
	},
	setfontSize : function(ev){
			var obj = App.fabricToolsChannel.request('getActiveObject');;
			obj.setFontSize(ev.currentTarget.value);
			App.fabricToolsChannel.trigger('renderall');
	},
	setFontFamily : function(ev){
			var obj = App.fabricToolsChannel.request('getActiveObject');;
			obj.setFontFamily(ev.currentTarget.value);
			App.fabricToolsChannel.trigger('renderall');
	},
	setLineHeight : function(ev){
			var obj = App.fabricToolsChannel.request('getActiveObject');;
			obj.setLineHeight(ev.currentTarget.value);
			App.fabricToolsChannel.trigger('renderall');
	},
	setTextStrokeWidth : function (ev) {
			var obj = App.fabricToolsChannel.request('getActiveObject');;
			obj.setStroke(true);
			obj.setStrokeWidth(ev.target.value);
			
			App.fabricToolsChannel.trigger('rebuildCanvas');
	},
	setTextStroke: function (style) {
			var obj = App.fabricToolsChannel.request('getActiveObject');;
			if(obj.getStroke()){
				obj.setStroke(false);
			} else {
					obj.setStroke(true);
			}
			App.fabricToolsChannel.trigger('renderall');
	},
	setTextBackgroundColor: function (ev) {
		var obj = App.fabricToolsChannel.request('getActiveObject');;
		if(obj.getTextBackgroundColor()){
			obj.setTextBackgroundColor(null);
			App.fabricToolsChannel.trigger('renderall');
		} else {
			var _func = function(color) {
				if(color){
					obj.setTextBackgroundColor(color.toRgbString());		
					App.fabricToolsChannel.trigger('renderall');
				}
			};
			this._spectrum(obj, _func);
		}
	},
	setFontColor : function(ev){
			var obj = App.fabricToolsChannel.request('getActiveObject');;
			var _func = function(color) {
				if(color){
					obj.setFill(color.toRgbString());		
					App.fabricToolsChannel.trigger('renderall');
				}
			};
			this._spectrum(obj, _func);
	},

	_spectrum : function(obj, _func){
		var _elm = this.$el;
		_elm.spectrum({
				showPalette: true,
				allowEmpty: true,
				hideAfterPaletteSelect:true,
				showAlpha: true,
				palette: [
					['black', 'white', 'blanchedalmond'],
					['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
				],
				change: _func,
				hide: function() {
					_elm.spectrum("destroy");
				}
		});
		setTimeout(function(){_elm.spectrum("show")},0);
	},
	setStyle: function (object, styleName, value) {
		//~ if (object.setSelectionStyles && object.isEditing) {
			//~ var style = { };
			//~ style[styleName] = value;
			//~ object.setSelectionStyles(style);
		//~ }
		//~ else {
			object[styleName] = value;
		//~ }
	},
	getStyle : function (object, styleName) {
		  return (object.getSelectionStyles && object.isEditing)
			? object.getSelectionStyles()[styleName]
			: object[styleName];
	},
};
module.exports =  App.Marionette.ItemView.extend(textToolsView);
