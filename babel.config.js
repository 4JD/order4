module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["import", { // ui引入配置
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
