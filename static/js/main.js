$(function(){
	var fetch = function(){
	if(httpxml.readyState === 4 && httpxml.status === 200)
		$('#count').text(httpxml.responseText);
		$('#count').data('count', parseInt(httpxml.responseText));
};
var httpxml = new XMLHttpRequest;
var httpxml2 = new XMLHttpRequest;

httpxml.open('get', '/count/1',true);
httpxml.addEventListener('readystatechange', fetch);
httpxml.send();


var update = function(e, value){
	if(httpxml2.readyState === 4 && httpxml2.status === 200)
		if(httpxml2.responseText === 'True')
			$('#count').text(value);
			$('#count').data('count', value);
};

var mod = function(type){
	var value;
	switch(type){
		case 'add':
			value = $('#count').data('count') + 1;
			break;
		case 'minus':
			value = $('#count').data('count') - 1;
			break;
	}
	
	httpxml2.open('put','/count/1?count=' + value, true);
	httpxml2.addEventListener('readystatechange', function(e){update(e, value)});
	httpxml2.send();
};

$('#add').on('click', function(){mod('add')});
$('#minus').on('click', function(){mod('minus')});
});
