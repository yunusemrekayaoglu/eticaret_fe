module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/my-vue-app/' : '/',
    outputDir: 'dist',
    assetsDir: 'docs',
    indexPath: 'docs/index.html',
};