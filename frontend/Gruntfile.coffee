ALL_TASKS = [
  'concat:all'
  'cssmin:dist'
  'uglify:dist'
  'sass:all'
  'copy:fontsfa'
  'copy:fontspages'
]

PROXY_TASKS = [
  'watch:proxy'
]

module.exports = (grunt) ->
  path = require('path')
  exec = require('child_process').exec

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.initConfig

    pkg: '<json:package.json>'
    build: '../survaider/static'

    concat:
      all:
        sourceMap: true
        files:
          '<%= build %>/js/survaider.js': [
            'bower_components/PACE/pace.js'
            'bower_components/jquery/jquery.js'
            'bower_components/modernizer/modernizr.js'
            'bower_components/jquery-ui/ui/jquery-ui.js'
            'bower_components/bootstrap/dist/js/bootstrap.js'
            'bower_components/jquery.easing/js/jquery.easing.js'
            'bower_components/jquery-unveil/jquery.unveil.js'
            'bower_components/jquery-bez/jquery.bez.min.js'
            'bower_components/ioslist/dist/json/jquery.ioslist.js'
            'bower_components/imagesloaded/imagesloaded.pkgd.js'
            'bower_components/jquery.actual/jquery.actual.js'
            'bower_components/jquery.scrollbar/jquery.scrollbar.js'
            'bower_components/datatables/media/js/jquery.dataTables.js'
            'pages/js/pages.js'
          ]
          '<%= build%>/js/builder.js': [
            'bower_components/survaider-builder/vendor/js/vendor.sans.jquery.js',
            'bower_components/survaider-builder/dist/formbuilder.js'
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
            'bower_components/datatables/media/css/jquery.dataTables.css'
            'pages/css/pages-icons.css'
            'pages/css/pages.css'
          ]
          '<%= build %>/css/builder.vendor.css': [
            'bower_components/survaider-builder/vendor/css/vendor.css'
          ]

    uglify:
      dist:
        files:
          '<%= build %>/js/survaider.min.js': '<%= build %>/js/survaider.js'
          '<%= build %>/js/builder.min.js': '<%= build %>/js/builder.js'

    copy:
      fontsfa:
        expand: true
        cwd: 'bower_components/font-awesome/fonts'
        src: '*'
        dest: '<%= build %>/fonts'
      fontspages:
        expand: true
        cwd: 'pages/fonts'
        src: '**/*'
        dest: '<%= build %>/fonts'

      proxy_main:
        expand: true
        cwd: '../../survaider-builder/dist'
        src: '*'
        dest: '<%= build %>/dev'
      proxy_vendor:
        expand: true
        cwd: '../../survaider-builder/vendor/js'
        src: '*'
        dest: '<%= build %>/dev'

    sass:
      all:
        options:
          quiet: false
          trace:true
          style: 'expanded'

        files:
          '<%= build %>/css/builder.main.css': 'assets/css/formbuilder.sass'

    watch:
      all:
        files: ['assets/css/*.sass']
        tasks: ['sass:all']
        options:
          livereload:
            host: 'localhost'
            port: 35729

      proxy:
        files: [
          '../../survaider-builder/dist/*.{css, js}'
          '../../survaider-builder/vendor/js/*.js'
        ]
        tasks: [
          'copy:proxy_main'
          'copy:proxy_vendor'
        ]
        options:
          livereload:
            host: 'localhost'
            port: 35729

  grunt.registerTask 'default', ALL_TASKS
  grunt.registerTask 'proxy_task', PROXY_TASKS
