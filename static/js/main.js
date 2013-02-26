$(function(){
	var fetch = function(httpxml){
	if(httpxml.readyState === 4 && httpxml.status === 200)
		$('#count').text(httpxml.responseText);
		$('#count').data('count', parseInt(httpxml.responseText));
	};

	var httpxml = new XMLHttpRequest;
	httpxml.open('get', '/count/1',true);
	httpxml.addEventListener('readystatechange', function(){fetch(httpxml)});
	httpxml.send();
	
	
	var update = function(e, httpxml2){
		if(httpxml2.readyState === 4 && httpxml2.status === 200)
			var value = httpxml2.responseText;
				$('#count').text(value);
				$('#count').data('count', value);
	};
	
	var mod = function(type){
		var httpxml2 = new XMLHttpRequest;
		httpxml2.open('put','/count/1?command=' + type, true);
		httpxml2.addEventListener('readystatechange', function(e){update(e, httpxml2)});
		httpxml2.send();
	};
	
	$('#add').on('click', function(){mod('add')});
	$('#minus').on('click', function(){mod('minus')});
});
