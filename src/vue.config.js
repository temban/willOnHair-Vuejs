module.exports = {

  devServer: {
    proxy: 'https://saas24.shintheo.com/web/session/authenticate',
},

    publicPath: process.env.NODE_ENV === 'production'
      ? '/public/'
      : '/'
  }