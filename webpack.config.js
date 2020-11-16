 const path = require(`path`);

 module.exports = {
   entry: [
     `./js/backend.js`,
     `./js/debounce.js`,
     `./js/form.js`,
     `./js/gallery.js`,
     `./js/render.js`,
     `./js/send.js`,
     `./js/validation.js`,
     `./js/preview.js`
   ],
   output: {
     filename: `bundle.js`,
     path: path.resolve(__dirname),
     iife: true
   },
   devtool: false
 };
