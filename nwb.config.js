module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactApolloCompose',
      externals: {
        react: 'React'
      }
    }
  }
}
