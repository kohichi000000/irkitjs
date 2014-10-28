module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        },
        ignores : ['public/js/_analytics.js'],
        force : true
      }
    },
    concat: {
      dist: {
        src: [
        'js/confidence.js',
        'js/require.js',
        'js/init.js',
        'js/getLocation.js',
        'js/main.js'
        ],
        dest: 'app.js'
      }
    },
    uglify: {
      my_target: {
        options: {
          // sourceMap: true,
          // sourceMapName: 'app.min.map'
        },
        files: {
          'app.js': ['js/*.js']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'test/results.txt',
          quiet: false
        },
        src: ['test/*.js']
      }
    },
    watch: {
      js: {
        files: [ 'js/*.js' ],
        tasks: [ 'mochaTest' , 'jshint' , 'concat'/*, 'uglify' */],
        options: {
            livereload: true,
            nospawn: true
        }
      }
    }
  });

  [
    'grunt-contrib-uglify',
    'grunt-contrib-jshint',
    'grunt-contrib-concat',
    'grunt-contrib-watch',
    'grunt-mocha-test'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  })

  grunt.registerTask('build', [ 'mochaTest' , 'jshint' , 'concat']);
  grunt.registerTask('default', [ 'jshint' , 'concat' , 'watch' ]);
};