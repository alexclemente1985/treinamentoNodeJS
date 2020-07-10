const app = require('./config/server');
const colors = require('colors');


app.listen(3000,()=>{
	console.log("Server online".yellow);
});



