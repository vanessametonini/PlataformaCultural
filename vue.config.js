const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../plataforma_cultural_api/static"),
  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: false,
    },
  },
  transpileDependencies: ['quasar'],
};
