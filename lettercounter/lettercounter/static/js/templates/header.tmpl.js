define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),branding = locals_.branding;
buf.push("<div role=\"navigation\" class=\"navbar navbar-inverse navbar-fixed-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"#\" class=\"navbar-brand\">" + (jade.escape(null == (jade_interp = branding) ? "" : jade_interp)) + "</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li class=\"active\"><a href=\"/\">Home</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\"><a href=\"#\" data-toggle=\"dropdown\" class=\"dropdown-toggle\">Advanced<span class=\"caret\"></span></a><ul role=\"menu\" class=\"dropdown-menu\"><li><a href=\"/api/counts/\">Counts API</a></li><li><a href=\"/api/counts/\">Sentence API</a></li><li><a href=\"/api/counts/\">Stats API</a></li></ul></li></ul></div></div></div>");;return buf.join("");
}

});