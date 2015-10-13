ALL_TASKS = [
  'concat:all'
  'cssmin:dist'
  'uglify:dist'
]

module.exports = (grunt) ->
  path = require('path')
  exec = require('child_process').exec

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.initConfig

    pkg: '<json:package.json>'
    build: '../survaider/static'

    concat:
      all:
        sourceMap: true
        files:
          '<%= build %>/js/survaider.js': [
            'bower_components/PACE/pace.js'
            'bower_components/jquery/dist/jquery.js'
            'bower_components/modernizer/modernizr.js'
            'bower_components/bootstrap/dist/js/bootstrap.js'
            'bower_components/jquery.scrollbar/jquery.scrollbar.js'
            'pages/js/pages.js'
          ]

    cssmin:
      dist:
        files:
          '<%= build %>/css/survaider.css': [
            'bower_components/PACE/themes/green/pace-theme-flash.css'
            'bower_components/bootstrap/dist/css/bootstrap.css'
            'bower_components/font-awesome/css/font-awesome.css'
            'bower_components/jquery.scrollbar/jquery.scrollbar.css'
            'bower_components/select2-bootstrap-css/select2-bootstrap.css'
            'bower_components/switchery/dist/switchery.css'
            'pages/css/pages.css'
          ]

    uglify:
      dist:
        files:
          '<%= build %>/js/survaider.min.js': '<%= build %>/js/survaider.js'

    # sass:
    #   all:
    #     options:
    #       quiet: false
    #       trace:true
    #       style: 'expanded'

    #     files:
    #       '<%= distFolder %>/formbuilder.css': '<%= srcFolder %>/styles/formbuilder.sass'

  grunt.registerTask 'default', ALL_TASKS
