const myMarked = require('marked');
const marked = (path)=>{
    let renderer = new myMarked.renderer();
    renderer.link = (href, text, path)
}

myMarked()