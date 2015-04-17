module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON("package.json"),

    // Banner definitions
    meta: {
      banner: "/*\n" +
        " * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *\n" +
        " * Copyright (c) <%= pkg.author.name %> - <%= pkg.author.url %>\n" +
        " *\n" +
        " * <%= pkg.description %>\n" +
        " *\n" +
        " * <%= pkg.license %> \n" +
        " */\n"
    },

    // Concat definitions
    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      dist: {
        src: ["src/jquery.adaptable-text.js"],
        dest: "dist/jquery.adaptable-text.js"
      }
    },

    // Lint definitions
    jshint: {
      files: ["src/jquery.adaptable-text.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: ["dist/jquery.adaptable-text.js"],
        dest: "dist/jquery.adaptable-text.min.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // CoffeeScript compilation
    coffee: {
      compile: {
        files: {
          "dist/jquery.adaptable-text.js": "src/jquery.adaptable-text.coffee"
        }
      }
    },

    // watch for changes to source
    // Better than calling grunt a million times
    // (call 'grunt watch')
    watch: {
        files: ['src/*'],
        tasks: ['default']
    }

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("build", ["concat", "uglify"]);
  grunt.registerTask("default", ["jshint", "build"]);
  grunt.registerTask("travis", ["default"]);

};
