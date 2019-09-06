module.exports = {

    publicPath: './',
    devServer:{
        proxy:{
            // '/':{
            //     target:'localhost:5000',
            //     changeOrigin: true,
            //     onProxyReq: function (proxyReq, req, res) {
            //         console.log("原路径：" + req.originalUrl, "代理路径：" + req.path)
            //         console.log(res)
            //     }
            // },
            '/api':{
                target:'http://localhost:3000/',
                changeOrigin: true,
                onProxyReq: function (proxyReq, req, res) {
                    console.log("原路径：" + req.originalUrl, "代理路径：" + req.path);
                }
                // pathRewrite: {
                //     '^/api/': '/'
                // }
            }
        }
    }

};
