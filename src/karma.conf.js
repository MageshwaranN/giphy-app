// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-unit-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: '../coverage',
      reporters: [
        {
          type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
        }
      ]
    },
    junitReporter: {
      outputDir: '../coverage', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'jasmine.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: '../reports/test_report.xml',
      overrideTestDescription: true,
      testPaths: ['src'],
      testFilePattern: '.spec.ts',
      useBrowserName: false

    },
    angularCli: {
      environment: 'dev'
    },

    reporters: ['mocha', 'coverage', 'junit', 'sonarqubeUnit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true
  });
};
