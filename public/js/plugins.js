/**
 * JavaScript plugins
 *
 * jQuery Cookie
 * ToggleVal
 * Twitter callback
 * Image preloader
 * jQuery UI Tabs
 * Fullscreen background
 * jQuery Easing
 * AnythingSlider
 */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {
    
    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        
        value = String(value);
        
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/* -------------------------------------------------- *
 * ToggleVal 3.0
 * Updated: 01/15/2010
 * -------------------------------------------------- *
 * Author: Aaron Kuzemchak
 * URL: http://aaronkuzemchak.com/
 * Copyright: 2008-2010 Aaron Kuzemchak
 * License: MIT License
** -------------------------------------------------- */

;(function($) {
	// main plugin function
	$.fn.toggleVal = function(theOptions) {
		// check whether we want real options, or to destroy functionality
		if(!theOptions || typeof theOptions == 'object') {
			theOptions = $.extend({}, $.fn.toggleVal.defaults, theOptions);
		}
		else if(typeof theOptions == 'string' && theOptions.toLowerCase() == 'destroy') {
			var destroy = true;
		}
		
		return this.each(function() {
			// unbind everything if we're destroying, and stop executing the script
			if(destroy) {
				$(this).unbind('focus.toggleval').unbind('blur.toggleval').removeData('defText');
				return false;
			}
			
			// define our variables
			var defText = '';
			
			// let's populate the field, if not default
			switch(theOptions.populateFrom) {
				case 'title':
					if($(this).attr('title')) {
						defText = $(this).attr('title');
						$(this).val(defText);
					}
					break;
				case 'label':
					if($(this).attr('id')) {
						defText = $('label[for="' + $(this).attr('id') + '"]').text();
						$(this).val(defText);
					}
					break;
				case 'custom':
					defText = theOptions.text;
					$(this).val(defText);
					break;
				default:
					defText = $(this).val();
			}
			
			// let's give this field a special class, so we can identify it later
			// also, we'll give it a data attribute, which will help jQuery remember what the default value is
			$(this).addClass('toggleval').data('defText', defText);
			
			// now that fields are populated, let's remove the labels if applicable
			if(theOptions.removeLabels == true && $(this).attr('id')) {
				$('label[for="' + $(this).attr('id') + '"]').remove();
			}
			
			// on to the good stuff... the focus and blur actions
			$(this).bind('focus.toggleval', function() {
				if($(this).val() == $(this).data('defText')) { $(this).val(''); }
				
				// add the focusClass, remove changedClass
				$(this).addClass(theOptions.focusClass);
			}).bind('blur.toggleval', function() {
				if($(this).val() == '' && !theOptions.sticky) { $(this).val($(this).data('defText')); }
				
				// remove focusClass, add changedClass if, well, different
				$(this).removeClass(theOptions.focusClass);
				if($(this).val() != '' && $(this).val() != $(this).data('defText')) { $(this).addClass(theOptions.changedClass); }
					else { $(this).removeClass(theOptions.changedClass); }
			});
		});
	};
	
	// default options
	$.fn.toggleVal.defaults = {
		focusClass: 'tv-focused', // class during focus
		changedClass: 'tv-changed', // class after focus
		populateFrom: 'default', // choose from: default, label, custom, or title
		text: null, // text to use in conjunction with populateFrom: custom
		removeLabels: false, // remove labels associated with the fields
		sticky: false // if true, default text won't reappear
	};
	
	// create custom selectors
	// :toggleval for affected elements
	// :changed for changed elements
	$.extend($.expr[':'], {
		toggleval: function(elem) {
			return $(elem).data('defText') || false;
		},
		changed: function(elem) {
			if($(elem).data('defText') && $(elem).val() != $(elem).data('defText')) {
				return true;
			}
			return false;
		}
	});
})(jQuery);

function twitterCallback2(twitters) {
  var statusHTML = [];
  for (var i=0; i<twitters.length; i++){
    var username = twitters[i].user.screen_name;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
    statusHTML.push('<li><span>'+status+'</span> <a style="font-size:85%" href="http://twitter.com/'+username+'/statuses/'+twitters[i].id_str+'">'+relative_time(twitters[i].created_at)+'</a></li>');
  }
  document.getElementById('twitter_update_list').innerHTML = statusHTML.join('');
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}
	

/*
 * Global image preloader
 * 
 * Copyright 2011 ThemeCatcher.net
 * All rights reserved
 * 
 */
window.preloadedImages = [];
window.preload = function (images) {
	for (var i in images) {
		var elem = document.createElement('img');
		elem.src = images[i];
		window.preloadedImages.push(elem);
	}
};

/*!
 * jQuery UI 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a,b){var d=a.nodeName.toLowerCase();if("area"===d){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&l(a)}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&l(a)}function l(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.13",
keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();
b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,
"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",
function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,m,n){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(m)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(n)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,
outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){return k(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,"tabindex"),d=isNaN(b);
return(d||b>=0)&&k(a,!d)}});c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=
0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*
 * jQuery UI Tabs 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(d,p){function u(){return++v}function w(){return++x}var v=0,x=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(b,e){if(b=="selected")this.options.collapsible&&
e==this.options.selected||this.select(e);else{this.options[b]=e;this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+u()},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+w());return d.cookie.apply(null,[b].concat(d.makeArray(arguments)))},_ui:function(b,e){return{tab:b,panel:e,index:this.anchors.index(b)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=
d(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(b){function e(g,f){g.css("display","");!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}var a=this,c=this.options,h=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=d(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);this.anchors.each(function(g,f){var i=d(f).attr("href"),l=i.split("#")[0],q;if(l&&(l===location.toString().split("#")[0]||
(q=d("base")[0])&&l===q.href)){i=f.hash;f.href=i}if(h.test(i))a.panels=a.panels.add(a.element.find(a._sanitizeSelector(i)));else if(i&&i!=="#"){d.data(f,"href.tabs",i);d.data(f,"load.tabs",i.replace(/#.*$/,""));i=a._tabId(f);f.href="#"+i;f=a.element.find("#"+i);if(!f.length){f=d(c.panelTemplate).attr("id",i).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[g-1]||a.list);f.data("destroy.tabs",true)}a.panels=a.panels.add(f)}else c.disabled.push(g)});if(b){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(c.selected===p){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){c.selected=g;return false}});if(typeof c.selected!=="number"&&c.cookie)c.selected=parseInt(a._cookie(),10);if(typeof c.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)c.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));c.selected=c.selected||(this.lis.length?0:-1)}else if(c.selected===null)c.selected=-1;c.selected=c.selected>=0&&this.anchors[c.selected]||c.selected<0?c.selected:0;c.disabled=d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return a.lis.index(g)}))).sort();d.inArray(c.selected,c.disabled)!=-1&&c.disabled.splice(d.inArray(c.selected,c.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(c.selected>=0&&this.anchors.length){a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash)).removeClass("ui-tabs-hide");this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");a.element.queue("tabs",function(){a._trigger("show",null,a._ui(a.anchors[c.selected],a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash))[0]))});this.load(c.selected)}d(window).bind("unload",function(){a.lis.add(a.anchors).unbind(".tabs");a.lis=a.anchors=a.panels=null})}else c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));
this.element[c.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");c.cookie&&this._cookie(c.selected,c.cookie);b=0;for(var j;j=this.lis[b];b++)d(j)[d.inArray(b,c.disabled)!=-1&&!d(j).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");c.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(c.event!=="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+
g)};this.lis.bind("mouseover.tabs",function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(c.fx)if(d.isArray(c.fx)){m=c.fx[0];o=c.fx[1]}else m=o=c.fx;var r=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",
function(){e(f,o);a._trigger("show",null,a._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");a._trigger("show",null,a._ui(g,f[0]))},s=m?function(g,f){f.animate(m,m.duration||"normal",function(){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);a.element.dequeue("tabs")})}:function(g,f){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");a.element.dequeue("tabs")};
this.anchors.bind(c.event+".tabs",function(){var g=this,f=d(g).closest("li"),i=a.panels.filter(":not(.ui-tabs-hide)"),l=a.element.find(a._sanitizeSelector(g.hash));if(f.hasClass("ui-tabs-selected")&&!c.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||a.panels.filter(":animated").length||a._trigger("select",null,a._ui(this,l[0]))===false){this.blur();return false}c.selected=a.anchors.index(this);a.abort();if(c.collapsible)if(f.hasClass("ui-tabs-selected")){c.selected=
-1;c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){s(g,i)}).dequeue("tabs");this.blur();return false}else if(!i.length){c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this));this.blur();return false}c.cookie&&a._cookie(c.selected,c.cookie);if(l.length){i.length&&a.element.queue("tabs",function(){s(g,i)});a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";
d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(b){if(typeof b=="string")b=this.anchors.index(this.anchors.filter("[href$="+b+"]"));return b},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=
d.data(this,"href.tabs");if(e)this.href=e;var a=d(this).unbind(".tabs");d.each(["href","load","cache"],function(c,h){a.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});b.cookie&&this._cookie(null,b.cookie);return this},add:function(b,
e,a){if(a===p)a=this.anchors.length;var c=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,b).replace(/#\{label\}/g,e));b=!b.indexOf("#")?b.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var j=c.element.find("#"+b);j.length||(j=d(h.panelTemplate).attr("id",b).data("destroy.tabs",true));j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(a>=this.lis.length){e.appendTo(this.list);j.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[a]);
j.insertBefore(this.panels[a])}h.disabled=d.map(h.disabled,function(k){return k>=a?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");j.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){c._trigger("show",null,c._ui(c.anchors[0],c.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[a],this.panels[a]));return this},remove:function(b){b=this._getIndex(b);var e=this.options,a=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();
if(a.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(b+(b+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=b}),function(h){return h>=b?--h:h});this._tabify();this._trigger("remove",null,this._ui(a.find("a")[0],c[0]));return this},enable:function(b){b=this._getIndex(b);var e=this.options;if(d.inArray(b,e.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(a){return a!=b});this._trigger("enable",null,
this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(b){b=this._getIndex(b);var e=this.options;if(b!=e.selected){this.lis.eq(b).addClass("ui-state-disabled");e.disabled.push(b);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[b],this.panels[b]))}return this},select:function(b){b=this._getIndex(b);if(b==-1)if(this.options.collapsible&&this.options.selected!=-1)b=this.options.selected;else return this;this.anchors.eq(b).trigger(this.options.event+".tabs");return this},
load:function(b){b=this._getIndex(b);var e=this,a=this.options,c=this.anchors.eq(b)[0],h=d.data(c,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(c,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(a.spinner){var j=d("span",c);j.data("label.tabs",j.html()).html(a.spinner)}this.xhr=d.ajax(d.extend({},a.ajaxOptions,{url:h,success:function(k,n){e.element.find(e._sanitizeSelector(c.hash)).html(k);e._cleanup();a.cache&&d.data(c,
"cache.tabs",true);e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.error(k,n,b,c)}catch(m){}}}));e.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},
url:function(b,e){this.anchors.eq(b).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.13"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(b,e){var a=this,c=this.options,h=a._rotate||(a._rotate=function(j){clearTimeout(a.rotation);a.rotation=setTimeout(function(){var k=c.selected;a.select(++k<a.anchors.length?k:0)},b);j&&j.stopPropagation()});e=a._unrotate||(a._unrotate=!e?function(j){j.clientX&&
a.rotate(null)}:function(){t=c.selected;h()});if(b){this.element.bind("tabsshow",h);this.anchors.bind(c.event+".tabs",e);h()}else{clearTimeout(a.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(c.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
;

/*
 * Full screen background plugin
 * 
 * Copyright 2011 ThemeCatcher.net
 * All rights reserved
 * 
 */
;(function ($, window) {
	// Full screen background default settings
	var defaults = {
		speedIn: 3000,			// Speed of the "fade in" transition between background images, in milliseconds 1000 = 1 second
		speedOut: 3000,			// Speed of the "fade out" transition between background images
		sync: true,			    // If true, both fade animations occur simultaneously, otherwise "fade in" waits for "fade out" to complete
		minimiseSpeedIn: 1000,	// Speed that the website fades in, in full screen mode, in milliseconds
		minimiseSpeedOut: 1000, // Speed that the website fades out, in full screen mode, in milliseconds
		controlSpeedIn: 500,	// Speed that the controls fades in, in full screen mode, in milliseconds
		fadeIE: false,			// Whether or not to fade the website in IE 7,8
		preload: true,			// Whether or not to preload images
		save: true,				// Whether or not to save the current background across pages
		slideshow: true,		// Whether or not to use the slideshow functionality
		slideshowAuto: true,	// Whether or not to start the slideshow automatically
		slideshowSpeed: 60000,   // How long the slideshow stays on one image, in milliseconds
		random: true,			// Whether the images should be displayed in random order, forces save = false
		keyboard: true,			// Whether or not to use the keyboard controls, left arrow, right arrow and esc key
		centerX: true,			// Whether or not to center the background image on the X axis
		centerY: true,			// Whether or not to center the background image on the Y axis
		onLoad: false,			// Callback when the current image starts loading
		onComplete: false		// Callback when the current image has completely loaded
	},
	
	// Wrappers & overlay
	$outer,
	$overlay,
	$stage,
	
	// Full screen controls
	$controlsWrap,
	$controls,
	$prev,
	$play,
	$next,
	$loadingWrap,
	$loading,
	$closeWrap,
	$close,
	
	// Template background controls
	$fsControls,
	$fsLoading,
	$fsPrev,
	$fsPlay,
	$fsNext,
	$fsMax,
	
	// Current image & window
	$image,
	$window = $(window),
	
	// Misc
	isIE = $.browser.msie && !$.support.opacity,
	backgrounds,
	total,
	imageCache = [],
	imageRatio,
	bodyOverflow,
	index = 0,
	active = false,
	settings,
	fullscreen;
	
	// Cache the images with given indices
	function cache()
	{
		$.each(arguments, function (i, cacheIndex) {
			if (typeof imageCache[cacheIndex] === 'undefined') {
				imageCache[cacheIndex] = document.createElement('img');
				imageCache[cacheIndex].src = backgrounds[cacheIndex];
			}
		});
	}
	
	// Randomly shuffle a given array
    function shuffle(array) {
        var tmp, current, top = array.length;

        if(top) while(--top) {
        	current = Math.floor(Math.random() * (top + 1));
        	tmp = array[current];
        	array[current] = array[top];
        	array[top] = tmp;
        }

        return array;
    }
    
    function trigger(event, callback) {
    	if (callback && typeof callback === 'function') {
    		callback.call();
    	}
    	
    	$.event.trigger(event);
    }
	
	// Initialisation
	function init() {
		// Create the div structure
		$outer = $('<div class="fullscreen-outer"></div>').append(
			$overlay = $('<div class="fullscreen-overlay"></div>'),
			$stage = $('<div class="fullscreen-stage"></div>')
		);
		
		$controlsWrap = $('<div class="fullscreen-controls-outer"></div>').append(
			$controls = $('<div class="fullscreen-controls"></div>').append(
				$prev = $('<div class="fullscreen-prev"></div>'),
				$play = $('<div class="fullscreen-play"></div>'),
				$next = $('<div class="fullscreen-next"></div>')
			),
			$loadingWrap = $('<div class="fullscreen-loading-wrap"></div>').append(
				$loading = $('<div class="fullscreen-loading"></div>')
			),
			$closeWrap = $('<div class="fullscreen-close-wrap"></div>').append(
				$close = $('<div class="fullscreen-close"></div>')
			)
		);
		
		$fsControls = $('<div class="fs-controls"></div>').append(
			$fsLoading = $('<div class="fs-loading"></div>'),
			$fsPrev = $('<div class="fs-prev"></div>'),
			$fsPlay = $('<div class="fs-play"></div>'),
			$fsNext = $('<div class="fs-next"></div>'),
			$fsMax = $('<div class="fs-max"></div>')
		);
				
		// Put the controls on the page
		$('.footer-inside').append($fsControls);
		$('body').prepend($outer).append($controlsWrap);
		
		if (total > 1) {
			$controls.add($fsPrev).add($fsNext).show();
			fullscreen.bindKeyboard();
			
			if (settings.slideshow) {
				// Slideshow functionality
				
				var timeout,
				start,
				stop;
				
				start = function () {
					$.cookie('fullscreenSlideshow', 'start');
					$play
						.bind('fullscreenComplete', function () {
							timeout = setTimeout(fullscreen.next, settings.slideshowSpeed);
						})
						.bind('fullscreenLoad', function () {						 
							clearTimeout(timeout);
						})
						.removeClass('fullscreen-play')
						.addClass('fullscreen-pause')
						.add($fsPlay)
						.unbind('click')
						.one('click', stop);
					$fsPlay
					 	.removeClass('fs-play')
					    .addClass('fs-pause');
					
					timeout = setTimeout(fullscreen.next, settings.slideshowSpeed);
				};
				
				stop = function () {
					$.cookie('fullscreenSlideshow', 'stop');
					clearTimeout(timeout);
					$play
						.unbind('fullscreenLoad fullscreenComplete')
						.removeClass('fullscreen-pause')
						.addClass('fullscreen-play')
						.add($fsPlay)
						.unbind('click')
						.one('click', start);
					$fsPlay
					 	.removeClass('fs-pause')
					 	.addClass('fs-play');
				};
				
				if ($.cookie('fullscreenSlideshow') === 'start') {
					start();
				} else if ($.cookie('fullscreenSlideshow') === 'stop') {
					stop();
				} else {
					if (settings.slideshowAuto) {
						start();
					} else {
						stop();
					}
				}
				
				$play.add($fsPlay).show();
			}
		}
		
		if (!settings.slideshow) {
			$fsControls.css('width', '100px');
		}		
		
		// Bind the next button to load the next image
		$prev.add($fsPrev).click(function () {
			if (!active) {
				fullscreen.prev();
			} else {
				return false;
			}
		});
		
		// Bind the next button to load the next image
		$next.add($fsNext).click(function () {
			if (!active) {
				fullscreen.next();
			} else {
				return false;
			}
		});
		
		// Bind the close button to close it
		$closeWrap.click(fullscreen.close);
		
		// Save the current body overflow value
		bodyOverflow = $('body').css('overflow');
		
		$fsMax.click(function (e) {
			e.preventDefault();
			$('body').css('overflow', 'hidden');			
			$('div.outside').fadeOut(settings.minimiseSpeedOut).hide(0, function () {
				$controlsWrap.fadeIn(settings.controlSpeedIn).show(0, function () {
					if (settings.keyboard) {
						$(document).bind('keydown.fullscreen', function (e) {
							if (e.keyCode === 27) {
								e.preventDefault();
								fullscreen.close();
							}
						});
					}
				});
			});
			$window.resize();
		});
		
		$window.resize(windowResize);
		
		if (settings.save) {
			// Check for the saved background cookie to override the default
			var savedBackground = $.cookie('fullscreenSavedBackground');		
			for(var i = 0; i < total; i++) {
				if (i == savedBackground) {
					index = i;
					break;
				}
			}
		}
						
		// Fade in the first image, then cache one next image and one previous image
		load(function () {
			if (settings.preload) {
				cache((index == (total - 1)) ? 0 : index + 1, (index == 0) ? total - 1 : index - 1);
			}
		});
	};
	
	// Load the current image
	function load(callback) {
		var image = document.createElement('img'),
		loadingTimeout;
		$image = $(image).css('position', 'fixed');
		$image.load(function () {
			$image.unbind('load');
			setTimeout(function () { // Chrome will sometimes report a 0 by 0 size if there isn't pause in execution
				imageRatio = image.height / image.width;
				var $current = $stage.find('img');
				$stage.append($image);
				windowResize(function () {
					clearTimeout(loadingTimeout);
					$loadingWrap.add($fsLoading).hide();
					var fn = function () {
						$image.animate({ opacity: 'show' }, {
							duration: settings.speedIn,
							complete: function () {
								active = false;
								$controlsWrap.add($fsControls).removeClass('fs-animating');
								
								trigger('fullscreenComplete', settings.onComplete);
								
								if (typeof callback === 'function') {
									callback.call();
								}
							}
						});
					};
					
					if ($current.length) {
						$current.animate({ opacity: 'hide' }, {
							duration: settings.speedOut,
							complete: function () {
								if (!settings.sync) {
									fn();
								}
								$current.remove();
							}
						});
						
						if (settings.sync) {
							fn();
						}
					} else {
						fn();
					}
				});
			}, 1);
		});
		
		loadingTimeout = setTimeout(function () { $loadingWrap.add($fsLoading).fadeIn(); }, 200);
		trigger('fullscreenLoad', settings.onLoad);
		active = true;
		$controlsWrap.add($fsControls).addClass('fs-animating');
		setTimeout(function () { // Opera 10.6+ will sometimes load the src before the onload function is set, so wait 1ms
			$image.attr('src', backgrounds[index]);
		}, 1);
	}
	
	// Resize the current image to set dimensions on window resize
	function windowResize(callback)
	{
		if ($image) {
			var windowWidth = $window.width(),
			windowHeight = $window.height(),
			left = 0,
			top = 0;
						
			if ((windowHeight / windowWidth) > imageRatio) {
				$image.height(windowHeight).width(windowHeight / imageRatio);
			} else {
				$image.width(windowWidth).height(windowWidth * imageRatio);
			}
			
			if (settings.centerX) {
				left = ((windowWidth - $image.width()) / 2) + 'px';
			}
			
			if (settings.centerY) {
				top = ((windowHeight - $image.height()) / 2) + 'px'
			}
			
			$image.css({
				left: left,
				top: top
			});
			
			if (typeof callback === 'function') {
				callback.call();
			}
		}
	}
	
	
	fullscreen = $.fullscreen = function (options) {
		settings = $.extend({}, defaults, options || {});
		
		backgrounds = settings.backgrounds;
		total = backgrounds.length;
		
		if (settings.random) {
			backgrounds = shuffle(backgrounds);
			settings.save = false;
		}

		if (typeof settings.backgroundIndex === 'number') {
			index = settings.backgroundIndex;
			settings.save = false;
		}
		
		if (isIE && !settings.fadeIE) {
			settings.minimiseSpeedOut = 0;
			settings.minimiseSpeedIn = 0;
			settings.controlSpeedIn = 0;
		}
		
		init();
	};
	
	fullscreen.close = function () {
		$controlsWrap.hide();
		$('div.outside').fadeIn(settings.minimiseSpeedIn);
		$('body').css('overflow', bodyOverflow);
		$(window).resize();
		fullscreen.unbindKeyboard();
	};
	
	fullscreen.next = function () {
		index = (index == (total - 1)) ? 0 : index + 1;
		load(function () {
			if (settings.preload) {
				cache((index == (total - 1)) ? 0 : index + 1); // Cache the next next image
			}
			
			if (settings.save) {
				$.cookie('fullscreenSavedBackground', index, {expires: 365});
			}
		});
	};
	
	fullscreen.prev = function () {
		index = (index == 0) ? total - 1 : index - 1;
		load(function () {
			if (settings.preload) {
				cache((index == 0) ? total - 1 : index - 1); // Cache the next previous image
			}
			
			if (settings.save) {
				$.cookie('fullscreenSavedBackground', index, {expires: 365});
			}
		});
	};
	
	fullscreen.bindKeyboard = function () {
		if (settings.keyboard) {
			$(document).bind('keydown.fullscreen', function (e) {
				if (!active) {
					if (e.keyCode === 37) {
						e.preventDefault();
						$prev.click();
					} else if (e.keyCode === 39) {
						e.preventDefault();
						$next.click();
					}
				}
			});
		}
	};
	
	fullscreen.unbindKeyboard = function () {
		if (settings.keyboard) {
			$(document).unbind('keydown.fullscreen');
		}
	};
	
	window.preload([
	    'images/loading.gif',
	    'images/close.png',
	    'images/close1.png'
	]);
		
	$(window).load(function () {
		// Preload one next image and one previous image
		if (settings.preload) {
			var previousIndex = (index == 0) ? total - 1 : index - 1;
			var nextIndex = (index == (total - 1)) ? 0 : index + 1;
			cache(previousIndex, nextIndex);
		}
	});
})(jQuery, window);

/*!
 * jQuery Countdown plugin v1.0
 * http://www.littlewebthings.com/projects/countdown/
 *
 * Copyright 2010, Vassilis Dourdounis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function($){

	$.fn.countDown = function (options) {

		config = {};

		$.extend(config, options);

		diffSecs = this.setCountDown(config);
	
		if (config.onComplete)
		{
			$.data($(this)[0], 'callback', config.onComplete);
		}
		if (config.omitWeeks)
		{
			$.data($(this)[0], 'omitWeeks', config.omitWeeks);
		}

		$('#' + $(this).attr('id') + ' .digit').html('<div class="top"></div><div class="bottom"></div>');
		$(this).doCountDown($(this).attr('id'), diffSecs, 500);

		return this;

	};

	$.fn.stopCountDown = function () {
		clearTimeout($.data(this[0], 'timer'));
	};

	$.fn.startCountDown = function () {
		this.doCountDown($(this).attr('id'),$.data(this[0], 'diffSecs'), 500);
	};

	$.fn.setCountDown = function (options) {
		var targetTime = new Date();

		if (options.targetDate)
		{
			targetTime = new Date(options.targetDate.month + '/' + options.targetDate.day + '/' + options.targetDate.year + ' ' + options.targetDate.hour + ':' + options.targetDate.min + ':' + options.targetDate.sec + (options.targetDate.utc ? ' UTC' : ''));
		}
		else if (options.targetOffset)
		{
			targetTime.setFullYear(options.targetOffset.year + targetTime.getFullYear());
			targetTime.setMonth(options.targetOffset.month + targetTime.getMonth());
			targetTime.setDate(options.targetOffset.day + targetTime.getDate());
			targetTime.setHours(options.targetOffset.hour + targetTime.getHours());
			targetTime.setMinutes(options.targetOffset.min + targetTime.getMinutes());
			targetTime.setSeconds(options.targetOffset.sec + targetTime.getSeconds());
		}

		var nowTime = new Date();

		diffSecs = Math.floor((targetTime.valueOf()-nowTime.valueOf())/1000);

		$.data(this[0], 'diffSecs', diffSecs);

		return diffSecs;
	};

	$.fn.doCountDown = function (id, diffSecs, duration) {
		$this = $('#' + id);
		if (diffSecs <= 0)
		{
			diffSecs = 0;
			if ($.data($this[0], 'timer'))
			{
				clearTimeout($.data($this[0], 'timer'));
			}
		}

		secs = diffSecs % 60;
		mins = Math.floor(diffSecs/60)%60;
		hours = Math.floor(diffSecs/60/60)%24;
		if ($.data($this[0], 'omitWeeks') == true)
		{
			days = Math.floor(diffSecs/60/60/24);
			weeks = Math.floor(diffSecs/60/60/24/7);
		}
		else 
		{
			days = Math.floor(diffSecs/60/60/24)%7;
			weeks = Math.floor(diffSecs/60/60/24/7);
		}

		$this.dashChangeTo(id, 'seconds_dash', secs, duration ? duration : 800);
		$this.dashChangeTo(id, 'minutes_dash', mins, duration ? duration : 1200);
		$this.dashChangeTo(id, 'hours_dash', hours, duration ? duration : 1200);
		$this.dashChangeTo(id, 'days_dash', days, duration ? duration : 1200);
		$this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);

		$.data($this[0], 'diffSecs', diffSecs);
		if (diffSecs > 0)
		{
			e = $this;
			t = setTimeout(function() { e.doCountDown(id, diffSecs-1) } , 1000);
			$.data(e[0], 'timer', t);
		} 
		else if (cb = $.data($this[0], 'callback')) 
		{
			$.data($this[0], 'callback')();
		}

	};

	$.fn.dashChangeTo = function(id, dash, n, duration) {
		  $this = $('#' + id);
		 
		  for (var i=($this.find('.' + dash + ' .digit').length-1); i>=0; i--)
		  {
				var d = n%10;
				n = (n - d) / 10;
				$this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit:eq('+i+')', d, duration);
		  }
	};

	$.fn.digitChangeTo = function (digit, n, duration) {
		if (!duration)
		{
			duration = 800;
		}
		if ($(digit + ' div.top').html() != n + '')
		{

			$(digit + ' div.top').css({'display': 'none'});
			$(digit + ' div.top').html((n ? n : '0')).slideDown(duration);

			$(digit + ' div.bottom').animate({'height': ''}, duration, function() {
				$(digit + ' div.bottom').html($(digit + ' div.top').html());
				$(digit + ' div.bottom').css({'display': 'block', 'height': ''});
				$(digit + ' div.top').hide().slideUp(10);

			
			});
		}
	};

})(jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/*
AnythingSlider v1.7.8 minified using Google Closure Compiler
Original by Chris Coyier: http://css-tricks.com
Get the latest version: https://github.com/ProLoser/AnythingSlider
*/

(function(d){d.anythingSlider=function(h,i){var a=this,b;a.el=h;a.$el=d(h).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');a.$el.data("AnythingSlider",a);a.init=function(){a.options=b=d.extend({},d.anythingSlider.defaults,i);a.initialized=!1;d.isFunction(b.onBeforeInitialize)&&a.$el.bind("before_initialize",b.onBeforeInitialize);a.$el.trigger("before_initialize",a);a.$wrapper=a.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-"+ b.theme);a.$window=a.$el.closest("div.anythingWindow");a.win=window;a.$win=d(a.win);a.$controls=d('<div class="anythingControls"></div>').appendTo(b.appendControlsTo!==null&&d(b.appendControlsTo).length?d(b.appendControlsTo):a.$wrapper);a.$startStop=d('<a href="#" class="start-stop"></a>');b.buildStartStop&&a.$startStop.appendTo(b.appendStartStopTo!==null&&d(b.appendStartStopTo).length?d(b.appendStartStopTo):a.$controls);a.$nav=d('<ul class="thumbNav" />').appendTo(b.appendNavigationTo!==null&&d(b.appendNavigationTo).length? d(b.appendNavigationTo):a.$controls);a.flag=!1;a.playing=b.autoPlay;a.slideshow=!1;a.hovered=!1;a.panelSize=[];a.currentPage=b.startPanel=parseInt(b.startPanel,10)||1;b.changeBy=parseInt(b.changeBy,10)||1;a.adj=b.infiniteSlides?0:1;a.width=a.$el.width();a.height=a.$el.height();a.outerPad=[a.$wrapper.innerWidth()-a.$wrapper.width(),a.$wrapper.innerHeight()-a.$wrapper.height()];b.playRtl&&a.$wrapper.addClass("rtl");if(b.expand)a.$outer=a.$wrapper.parent(),a.$window.css({width:"100%",height:"100%"}), a.checkResize();b.buildStartStop&&a.buildAutoPlay();b.buildArrows&&a.buildNextBackButtons();if(!b.autoPlay)b.autoPlayLocked=!1;a.updateSlider();a.$lastPage=a.$currentPage;a.runTimes=d("div.anythingSlider").index(a.$wrapper)+1;a.regex=RegExp("panel"+a.runTimes+"-(\\d+)","i");a.runTimes===1&&a.makeActive();if(!d.isFunction(d.easing[b.easing]))b.easing="swing";b.pauseOnHover&&a.$wrapper.hover(function(){a.playing&&(a.$el.trigger("slideshow_paused",a),a.clearTimer(!0))},function(){a.playing&&(a.$el.trigger("slideshow_unpaused", a),a.startStop(a.playing,!0))});a.setCurrentPage(a.gotoHash()||b.startPage,!1);a.slideControls(!1);a.$wrapper.bind("mouseenter mouseleave",function(b){a.hovered=b.type==="mouseenter"?!0:!1;a.slideControls(a.hovered,!1)});d(document).keyup(function(c){if(b.enableKeyboard&&a.$wrapper.is(".activeSlider")&&!c.target.tagName.match("TEXTAREA|INPUT|SELECT"))switch(c.which){case 39:a.goForward();break;case 37:a.goBack()}});a.$items.delegate("a","focus.AnythingSlider",function(c){var e=d(this).closest(".panel"), f=a.$items.index(e)+a.adj;a.$items.find(".focusedLink").removeClass("focusedLink");d(this).addClass("focusedLink");a.$window.scrollLeft(0);!e.is(".activePage")&&a.currentPage+b.showMultiple-1>f&&(a.gotoPage(f),c.preventDefault())});var c="slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");d.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "),function(g,e){d.isFunction(b[e])&& a.$el.bind(c[g],b[e])});d.isFunction(b.onSlideComplete)&&a.$el.bind("slide_complete",function(){setTimeout(function(){b.onSlideComplete(a)},0)});a.initialized=!0;a.$el.trigger("initialized",a);a.startStop(a.playing)};a.updateSlider=function(){a.$el.children(".cloned").remove();a.$nav.empty();a.currentPage=a.currentPage||1;a.$items=a.$el.children();a.pages=a.$items.length;b.showMultiple=parseInt(b.showMultiple,10)||1;if(b.showMultiple>1){if(b.showMultiple>a.pages)b.showMultiple=a.pages;a.adjustMultiple= b.infiniteSlides&&a.pages>1?0:b.showMultiple-1;a.pages=a.$items.length-a.adjustMultiple}a.$controls.add(a.$nav).add(a.$startStop).add(a.$forward).add(a.$back)[a.pages<=1?"hide":"show"]();a.pages>1&&a.buildNavigation();b.infiniteSlides&&a.pages>1&&(a.$el.prepend(a.$items.filter(":last").clone().removeAttr("id").addClass("cloned")),b.showMultiple>1?a.$el.append(a.$items.filter(":lt("+b.showMultiple+")").clone().removeAttr("id").addClass("cloned").addClass("multiple")):a.$el.append(a.$items.filter(":first").clone().removeAttr("id").addClass("cloned")), a.$el.find(".cloned").each(function(){d(this).find("a,input,textarea,select,button,area").attr("disabled","disabled");d(this).find("[id]").removeAttr("id")}));a.$items=a.$el.children().addClass("panel");a.setDimensions();b.resizeContents?(a.$items.css("width",a.width),a.$wrapper.css("width",a.getDim(a.currentPage)[0]),a.$wrapper.add(a.$items).css("height",a.height)):a.$win.load(function(){a.setDimensions()});if(a.currentPage>a.pages)a.currentPage=a.pages;a.setCurrentPage(a.currentPage,!1);a.$nav.find("a").eq(a.currentPage- 1).addClass("cur")};a.buildNavigation=function(){if(b.buildNavigation&&a.pages>1){var c,g;a.$items.filter(":not(.cloned)").each(function(e){var f=e+1;c=(f===1?"first":"")+(f===a.pages?"last":"");g=d('<a href="#"></a>').addClass("panel"+f).wrap('<li class="'+c+'" />');a.$nav.append(g.parent());d.isFunction(b.navigationFormatter)?(c=b.navigationFormatter(f,d(this)),g.html("<span>"+c+"</span>"),parseInt(g.find("span").css("text-indent"),10)<0&&g.addClass(b.tooltipClass).attr("title",c)):g.html("<span>"+ f+"</span>");g.bind(b.clickControls,function(c){if(!a.flag&&b.enableNavigation)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.gotoPage(f),b.hashTags&&a.setHash(f);c.preventDefault()})});if(b.navigationSize!==!1&&parseInt(b.navigationSize,10)<a.pages)a.$controls.find(".anythingNavWindow").length||a.$nav.before('<ul><li class="prev"><a href="#"><span>'+b.backText+"</span></a></li></ul>").after('<ul><li class="next"><a href="#"><span>'+b.forwardText+"</span></a></li></ul>").wrap('<div class="anythingNavWindow"></div>'), a.navWidths=a.$nav.find("li").map(function(){return d(this).innerWidth()}).get(),a.navLeft=1,a.$nav.width(a.navWidth(1,a.pages+1)+5),a.$controls.find(".anythingNavWindow").width(a.navWidth(1,b.navigationSize+1)).end().find(".prev,.next").bind(b.clickControls,function(c){if(!a.flag)a.flag=!0,setTimeout(function(){a.flag=!1},200),a.navWindow(a.navLeft+b.navigationSize*(d(this).is(".prev")?-1:1));c.preventDefault()})}};a.navWidth=function(b,g){for(var d=Math.min(b,g),f=Math.max(b,g),j=0;d<f;d++)j+=a.navWidths[d- 1]||0;return j};a.navWindow=function(c){var d=a.pages-b.navigationSize+1,c=c<=1?1:c>1&&c<d?c:d;if(c!==a.navLeft)a.$controls.find(".anythingNavWindow").animate({scrollLeft:a.navWidth(1,c),width:a.navWidth(c,c+b.navigationSize)},{queue:!1,duration:b.animationTime}),a.navLeft=c};a.buildNextBackButtons=function(){a.$forward=d('<span class="arrow forward"><a href="#"><span>'+b.forwardText+"</span></a></span>");a.$back=d('<span class="arrow back"><a href="#"><span>'+b.backText+"</span></a></span>");a.$back.bind(b.clickBackArrow, function(c){if(b.enableArrows&&!a.flag)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.goBack();c.preventDefault()});a.$forward.bind(b.clickForwardArrow,function(c){if(b.enableArrows&&!a.flag)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.goForward();c.preventDefault()});a.$back.add(a.$forward).find("a").bind("focusin focusout",function(){d(this).toggleClass("hover")});a.$back.appendTo(b.appendBackTo!==null&&d(b.appendBackTo).length?d(b.appendBackTo):a.$wrapper);a.$forward.appendTo(b.appendForwardTo!== null&&d(b.appendForwardTo).length?d(b.appendForwardTo):a.$wrapper);a.$arrowWidth=a.$forward.width()};a.buildAutoPlay=function(){a.$startStop.html("<span>"+(a.playing?b.stopText:b.startText)+"</span>").bind(b.clickSlideshow,function(c){b.enableStartStop&&(a.startStop(!a.playing),a.makeActive(),a.playing&&!b.autoPlayDelayed&&a.goForward(!0));c.preventDefault()}).bind("focusin focusout",function(){d(this).toggleClass("hover")})};a.checkResize=function(c){clearTimeout(a.resizeTimer);a.resizeTimer=setTimeout(function(){var d= a.$outer.width()-a.outerPad[0],e=(a.$outer[0].tagName==="BODY"?a.$win.height():a.$outer.height())-a.outerPad[1];if(a.width*b.showMultiple!==d||a.height!==e)a.setDimensions(),a.gotoPage(a.currentPage,a.playing,null,1);typeof c==="undefined"&&a.checkResize()},500)};a.setDimensions=function(){var c,g,e,f=0,j=b.showMultiple>1?a.width||a.$window.width()/b.showMultiple:a.$window.width(),h=a.$win.width();if(b.expand)c=a.$outer.width()-a.outerPad[0],a.height=g=a.$outer.height()-a.outerPad[1],a.$wrapper.add(a.$window).add(a.$items).css({width:c, height:g}),a.width=j=b.showMultiple>1?c/b.showMultiple:c;a.$items.each(function(i){e=d(this).children();b.resizeContents?(c=a.width,d(this).css({width:c,height:a.height}),e.length&&e[0].tagName==="EMBED"&&e.attr({width:"100%",height:"100%"}),e.length===1&&e.css({width:"100%",height:"100%"})):(c=d(this).width(),e.length===1&&c>=h&&(c=e.width()>=h?j:e.width(),e.css("max-width",c)),d(this).css("width",c),g=d(this).outerHeight(),d(this).css("height",g));a.panelSize[i]=[c,g,f];f+=c});a.$el.css("width", f)};a.getDim=function(c){if(a.pages<1||isNaN(c))return[a.width,a.height];var c=b.infiniteSlides&&a.pages>1?c:c-1,d,e=a.panelSize[c][0],f=a.panelSize[c][1];if(b.showMultiple>1)for(d=1;d<b.showMultiple;d++)e+=a.panelSize[(c+d)%b.showMultiple][0],f=Math.max(f,a.panelSize[c+d][1]);return[e,f]};a.goForward=function(c){a.gotoPage(a.currentPage+b.changeBy*(b.playRtl?-1:1),c)};a.goBack=function(c){a.gotoPage(a.currentPage+b.changeBy*(b.playRtl?1:-1),c)};a.gotoPage=function(c,d,e,f){d!==!0&&(d=!1,a.startStop(!1), a.makeActive());b.changeBy!==1&&(c<0&&(c+=a.pages),c>a.pages&&(c-=a.pages));if(!(a.pages<=1)){a.$lastPage=a.$currentPage;if(typeof c!=="number")c=b.startPanel,a.setCurrentPage(c);if(!d||!b.isVideoPlaying(a))c>a.pages+1-a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?1:a.pages),c<a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?a.pages:1),a.currentPage=c>a.pages?a.pages:c<1?1:a.currentPage,a.$currentPage=a.$items.eq(a.currentPage-a.adj),a.exactPage=c,a.$targetPage=a.$items.eq(c===0?a.pages-a.adj:c>a.pages?1-a.adj: c-a.adj),f=f||b.animationTime,f>1&&a.$el.trigger("slide_init",a),a.slideControls(!0,!1),d!==!0&&(d=!1),(!d||b.stopAtEnd&&c===a.pages)&&a.startStop(!1),f>1&&a.$el.trigger("slide_begin",a),setTimeout(function(){if(!b.resizeContents){var d=a.getDim(c);a.$wrapper.filter(":not(:animated)").animate({width:d[0]||a.width,height:d[1]||a.height},{queue:!1,duration:f,easing:b.easing})}a.$el.filter(":not(:animated)").animate({left:-a.panelSize[b.infiniteSlides&&a.pages>1?c:c-1][2]},{queue:!1,duration:f,easing:b.easing, complete:function(){a.endAnimation(c,e,f)}})},parseInt(b.delayBeforeAnimate,10)||0)}};a.endAnimation=function(c,d,e){c===0?(a.$el.css("left",-a.panelSize[a.pages][2]),c=a.pages):c>a.pages&&(a.$el.css("left",-a.panelSize[1][2]),c=1);a.exactPage=c;a.setCurrentPage(c,!1);a.$items.removeClass("activePage").eq(c-a.adj).addClass("activePage");a.hovered||a.slideControls(!1);e>1&&a.$el.trigger("slide_complete",a);typeof d==="function"&&d(a);b.autoPlayLocked&&!a.playing&&setTimeout(function(){a.startStop(!0)}, b.resumeDelay-(b.autoPlayDelayed?b.delay:0))};a.setCurrentPage=function(c,d){c=parseInt(c,10);if(!(a.pages<1||c===0||isNaN(c))){c>a.pages+1-a.adj&&(c=a.pages-a.adj);c<a.adj&&(c=1);b.buildNavigation&&a.$nav.find(".cur").removeClass("cur").end().find("a").eq(c-1).addClass("cur");!b.infiniteSlides&&b.stopAtEnd&&(a.$wrapper.find("span.forward")[c===a.pages?"addClass":"removeClass"]("disabled").end().find("span.back")[c===1?"addClass":"removeClass"]("disabled"),c===a.pages&&a.playing&&a.startStop());if(!d){var e= a.getDim(c);a.$wrapper.css({width:e[0],height:e[1]}).add(a.$window).scrollLeft(0);a.$el.css("left",-a.panelSize[b.infiniteSlides&&a.pages>1?c:c-1][2])}a.currentPage=c;a.$currentPage=a.$items.removeClass("activePage").eq(c-a.adj).addClass("activePage")}};a.makeActive=function(){a.$wrapper.is(".activeSlider")||(d(".activeSlider").removeClass("activeSlider"),a.$wrapper.addClass("activeSlider"))};a.gotoHash=function(){var c=a.win.location.hash,g=c.indexOf("&"),e=c.match(a.regex);e===null&&!/^#&/.test(c)? (c=c.substring(0,g>=0?g:c.length),e=d(c).closest(".anythingBase")[0]===a.el?d(c).closest(".panel").index():null):e!==null&&(e=b.hashTags?parseInt(e[1],10):null);return e};a.setHash=function(b){var d="panel"+a.runTimes+"-",e=a.win.location.hash;if(typeof e!=="undefined")a.win.location.hash=e.indexOf(d)>0?e.replace(a.regex,d+b):e+"&"+d+b};a.slideControls=function(c){var d=c?0:b.animationTime,e=c?b.animationTime:0,f=c?1:0,h=c?0:1;b.toggleControls&&a.$controls.stop(!0,!0).delay(d)[c?"slideDown":"slideUp"](b.animationTime/ 2).delay(e);b.buildArrows&&b.toggleArrows&&(!a.hovered&&a.playing&&(h=1,f=0),a.$forward.stop(!0,!0).delay(d).animate({right:h*a.$arrowWidth,opacity:f},b.animationTime/2),a.$back.stop(!0,!0).delay(d).animate({left:h*a.$arrowWidth,opacity:f},b.animationTime/2))};a.clearTimer=function(b){if(a.timer&&(a.win.clearInterval(a.timer),!b&&a.slideshow))a.$el.trigger("slideshow_stop",a),a.slideshow=!1};a.startStop=function(c,d){c!==!0&&(c=!1);if((a.playing=c)&&!d)a.$el.trigger("slideshow_start",a),a.slideshow= !0;b.buildStartStop&&(a.$startStop.toggleClass("playing",c).find("span").html(c?b.stopText:b.startText),parseInt(a.$startStop.find("span").css("text-indent"),10)<0&&a.$startStop.addClass(b.tooltipClass).attr("title",c?b.stopText:b.startText));c?(a.clearTimer(!0),a.timer=a.win.setInterval(function(){b.isVideoPlaying(a)?b.resumeOnVideoEnd||a.startStop():a.goForward(!0)},b.delay)):a.clearTimer()};a.init()};d.anythingSlider.defaults={theme:"default",expand:!1,resizeContents:!0,showMultiple:!1,easing:"swing", buildArrows:!0,buildNavigation:!0,buildStartStop:!0,appendForwardTo:null,appendBackTo:null,appendControlsTo:null,appendNavigationTo:null,appendStartStopTo:null,toggleArrows:!1,toggleControls:!1,startText:"Start",stopText:"Stop",forwardText:"&raquo;",backText:"&laquo;",tooltipClass:"tooltip",enableArrows:!0,enableNavigation:!0,enableStartStop:!0,enableKeyboard:!0,startPanel:1,changeBy:1,hashTags:!0,infiniteSlides:!0,navigationFormatter:null,navigationSize:!1,autoPlay:!1,autoPlayLocked:!1,autoPlayDelayed:!1, pauseOnHover:!0,stopAtEnd:!1,playRtl:!1,delay:3E3,resumeDelay:15E3,animationTime:600,delayBeforeAnimate:0,clickForwardArrow:"click",clickBackArrow:"click",clickControls:"click focusin",clickSlideshow:"click",resumeOnVideoEnd:!0,addWmodeToObject:"opaque",isVideoPlaying:function(){return!1}};d.fn.anythingSlider=function(h,i){return this.each(function(){var a,b=d(this).data("AnythingSlider");(typeof h).match("object|undefined")?b?b.updateSlider():new d.anythingSlider(this,h):/\d/.test(h)&&!isNaN(h)&& b&&(a=typeof h==="number"?h:parseInt(d.trim(h),10),a>=1&&a<=b.pages&&b.gotoPage(a,!1,i))})}})(jQuery);
