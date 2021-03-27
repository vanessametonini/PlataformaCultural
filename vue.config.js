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
  pwa: {
    name: "Cartografia da Cultura - Campo Grande",
    themeColor: "#000000",
    msTileColor: "#FFFFFF",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#000000"
    }
  },
};
