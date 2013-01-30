/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:mustache.jquery.json>',
	meta: {
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/tests.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
	concat: {
      dist: {
        src: ['<banner:meta.banner>', 'src/jquery.<%= pkg.name %>.js'],
        dest: 'jquery.<%= pkg.name %>.js'
      }
    },
	min: {
      dist: {
        src: ['jquery.<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat qunit');
  grunt.registerTask('dist', 'default min');
};
