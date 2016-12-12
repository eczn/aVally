var template = require('art-template');
var fs = require("fs"); 
var md = require('markdown-it')({
	html: true,
	linkify: true,
	typographer: true
});
var config = require('./config'); 

module.exports = {
	// generate a file 
	entry: (toWhere, archives) => {

	}, 
	generate: (filePath, cb) => {
		fs.readFile(filePath, (err, mdFileData) => {
			if (err){
				console.log(err); 
			}
			// console.log(mdFileData.toString()); 
			// var parseRes = md.toHTML(mdFileData.toString());
			mdFileText = mdFileData.toString(); 
			mdArr = mdFileText.split('------'); 
			var blog; 
			var parseRes;

			if (mdArr[0] == mdFileText){
				// no config
				blog = {}; 
				parseRes = md.render( mdFileText ); 
			} else {
				blog = JSON.parse(mdArr[0]); 
				// console.log(blog.title); 

				parseRes = md.render( mdArr[1] ); 
			}
			
			
			// console.log(parseRes); 

			var data = {
				msg: 'blogs',
				md: parseRes,
				blog: blog
			}

			// parseRes = template(parseRes, {
			// 	blog: blog
			// });
			// console.log(parseRes);

			template.config('base', __dirname);
			template.config('escape', false);
			template.config('encoding', 'utf-8'); 

			var html = template("./template/blog/blog", data);

			// console.log(html); 


			// fs.writeFile(config.dist+'/'+(fileName.split('.'))[0]+'.html', html,  function(err) {
			// 	if (err) {
			// 		return console.error(err);
			// 	}
			// });
			cb(html); 
		});
	}
}

