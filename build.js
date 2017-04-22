const packager = require('electron-packager');
const config = require('./package.json');

packager({
    name: config['name'],
    dir: ".",
    out: "./releases",
    platform: "win32",
    arch: "x64",
    overwrite: true,
    asar: true,
    download: "cache"
}, (err, appPaths) => {
    if (err)
        console.log(err);
    console.log(`Finish: ${appPaths}`);
});