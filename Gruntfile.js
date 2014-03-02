var shim = require('browserify-shim');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> '
        // + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
        // + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
        // + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>'
        + '*/'
    },

    browserify2: {
      compile: {
        entry: 'public/javascripts/main.js',
        compile: 'dist/app.js'
      }
    },

    cssmin: {
      combine: {
        files: {
          'dist/<%= pkg.name %>.css': ['public/stylesheets/*.css']
        }
      },
      minify: {
        options: {
          banner: '<%= meta.banner %>'
        },
        expand: true,
        cwd: 'dist/',
        src: ['<%= pkg.name %>.css'],
        dest: 'dist/',
        ext: '.min.css'
      }
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        src: ['public/javascripts/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-browserify2');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'concat', 'uglify']);

};
