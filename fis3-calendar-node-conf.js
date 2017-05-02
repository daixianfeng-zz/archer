fis.match('*', {
    release: false
});
fis.match('fe/css/(**.css)', {
    useHash: true, //default is `true`
    // compress css invoke fis-optimizer-clean-css
    optimizer: fis.plugin('clean-css'),
    url: '/static/css/$1',
    release: 'static/static/css/$1'
});
fis.match('fe/js/(**.js)', {
    useHash: true, // default is true
    isMod: false,
    // 指定压缩插件 fis-optimizer-uglify-js 
    optimizer: fis.plugin('uglify-js'),
    url: '/static/js/$1',
    release: 'static/static/js/$1'
});
fis.match('fe/lib/(**)', {
    useHash: false,
    useCompile: false, 
    url: '/static/lib/$1',
    release: 'static/static/lib/$1'
});
fis.match('fe/(**.html)', {
    useHash: false, 
    isHtmlLike: true,
    release: false
});

fis.media('prod').match('*.{jsx,js,css,less,png,jpg,jpeg,gif,ico}', {
    domain: ''
});
// fis.media('dev').match('*.{jsx,js,css,less,png,jpg,jpeg,gif,ico}', {
//     useHash: false,
//     useSprite: false,
//     optimizer: null,
//     domain: ''
// });
fis.media('debug').match('*.{jsx,js,css,less,png,jpg,jpeg,gif,ico}', {
    useHash: false,
    useSprite: false,
    optimizer: null,
    domain: ''
});