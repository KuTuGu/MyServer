// node.js used to read string base on .vue file
const fs = require("fs"),
      path = require('path'),
      dir = "src/components/",
      whiteList = [
        "navigation.vue", 
        "getVue.vue",
        "code.vue",
        'soundMeter.js',
      ],
      writeTo = "src/vue.json",
      res = {};
      
readFileListSync(dir);

fs.writeFile(writeTo, JSON.stringify(res), err => {
  if (err) {
    throw `Write file error: ${err}`;
  }
});

function readFileListSync(dir) {
  try{
    const fileList = fs.readdirSync(dir);

    fileList.forEach(file => {
      if(whiteList.indexOf(file) <= -1){
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {      
          readFileListSync(path.join(dir, file));
        } else {                
          const data = fs.readFileSync(fullPath);
          
          res[fullPath.replace(/\\/g, '/')] = data.toString();        
        }
      }
    })
  }
  catch(err){
    throw `Read file list error: ${err}`;
  }
}