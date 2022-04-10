const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/*.js',
  output: './output',
  plugins: {
    allure: {
  }
},
  helpers: {
    Playwright: {
      url: 'https://todomvc.com/examples/react/#',
      show: true,
      browser: 'chromium'
    },
    ChaiWrapper : {
      require: "codeceptjs-chai"
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'test task'
}