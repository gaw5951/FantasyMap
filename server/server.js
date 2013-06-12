var connect = require('connect');
connect.createServer(			 
		connect.logger({ immediate: true, format: 'default' }),
		connect.static(__dirname)
).listen(8000);
