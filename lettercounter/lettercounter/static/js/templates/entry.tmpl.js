define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"left_side section\"><div class=\"form-group\"><label for=\"letters\">Enter Some Letters or Words in the Box Below:</label><textarea rows=\"5\" id=\"letters\" class=\"form-control\"></textarea><button type=\"button\" class=\"btn btn-default btn-lg compute\"><span aria-hidden=\"true\" class=\"glyphicon glyphicon-flash\"></span> Compute</button></div></div>");;return buf.join("");
}

});