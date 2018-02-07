// render.js
const tpl = require('tplser')
	, path = require('path')
    , config = require('../config')
    , tplConfig = {
    	compress: true
    }
    , createRender = tplPath => tpl.fromFile(tplPath, tplConfig)
    , style = require('./style')
    , icon = require('./icon')
    
// Global 
tpl.push({
	config: config,
	style: style,
	preFill: (e, preSet = '00') => {
		const L = preSet.length; 
		return (preSet + e).slice(-L); 
	},
	YYMMDD: function(date, sep = '-'){
		return [
			date.getFullYear(),
			date.getMonth()+1,
			date.getDate()
		].map(d => d.toString())
		.map(d => ('00' + d).slice(d.length >= 4 ? -4 : -2)).join(sep); 
	},
	list: n => {
		return new Array(parseInt(n)).fill(0); 
	}
}); 

// Icon Loader 
let icons = icon(); 
tpl.push(icons); 


var blogRender = tpl.fromFile(
	path.join(__dirname, '../view/blog.html'), 
	{
		compress: true,
		name: 'blog'
	}
)

var homeRender = tpl.fromFile(
	path.join(__dirname, '../view/home.html'), 
	{
		compress: true,
		name: 'home'
	}
)

var cateRender = tpl.fromFile(
	path.join(__dirname, '../view/cate.html'), 
	{
		compress: true, 
		name: 'cate'
	}
)

var catesRender = tpl.fromFile(
	path.join(__dirname, '../view/cates.html'), 
	{
		compress: true, 
		name: 'cates'
	}
)

var indexRender = tpl.fromFile(
	path.join(__dirname, '../view/index.html'), 
	{
		compress: true, 
		name: 'index'
	}
)

var loadPublic = () => {
	let needRegistry = [
		'../view/aside.html'
	].map(file => {
		let name = path.parse(file);

		return tpl.fromFile(
			path.join(__dirname, file), 
			{
				compress: true, 
				name: name
			}
		)
	})
}

let render = {
	blog: blogRender, 
	home: homeRender, 
	cate: cateRender, 
	cates: catesRender, 
	index: indexRender,
	reload: reload
}

loadPublic(); 

function reload(p){
	// let { name, tpl } = p; 
	loadPublic();

	if (this[p.name]){
		// 如果存在则reload 
		this[p.name] = tpl.fromFile(p.tpl, {
			comress: true, 
			name: p.name
		}); 
	} else {
		// 否则警告 
		console.warn(`[[ WARN ]] The Template ${p.name} Not Found In Render`); 
	}

	// this.blog = createRender(
	// 	path.join(__dirname, '../view/blog.html')
	// )

	// this.home = createRender(
	// 	path.join(__dirname, '../view/home.html')
	// )

	// this.cate = createRender(
	// 	path.join(__dirname, '../view/cate.html')
	// )

	// this.cates = createRender(
	// 	path.join(__dirname, '../view/cates.html')
	// )
}

module.exports = render; 
