module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset",
    "airbnb"
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "quasar": {
          "transform": "quasar/dist/babel-transforms/imports.js",
          "preventFullImport": true
        }
      }
    ],
    // [
    //   "transform-imports",
    //   {
    //     "quasar": {
    //       "transform": "quasar/dist/babel-transforms/imports.js",
    //       "preventFullImport": true
    //     }
    //   }
    // ]
  ]
}