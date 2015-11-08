ALL_TASKS = [
  'coffee:all'
  'concat:all'
  'concat:simplesurvey'
  'cssmin:dist'
  'cssmin:simplesurvey'
  'sass:all'
  'copy:fontsfa'
  'copy:fontspages'
  'copy:simplesurvey'
]

PROXY_TASKS = [
  'watch:proxy'
]

module.exports = (grunt) ->
  path = require('path')
  exec = require('child_process').exec

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.initConfig

    pkg: '<json:package.json>'
    build: '../survaider/static'
    templates: '../survaider/templates'

    coffee:
      all:
        files:
          '<%= build %>/domain/dashboard.js': [
            'src/coffee/dashboard.coffee'
          ]
          '<%= build %>/domain/analytics.js': [
            'src/coffee/analytics.coffee'
          ]
          '<%= build %>/domain/builder.js': [
            'src/coffee/builder.coffee'
          ]

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
            'bower_components/datatables-buttons/js/dataTables.buttons.js'
            'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js'
            'bower_components/bootstrap-timepicker/js/bootstrap-timepicker.js'
            'bower_components/pdfmake/build/pdfmake.js'
            'bower_components/switchery/dist/switchery.js'
            'bower_components/uri-template.js/dist/uri-template.js'
            'bower_components/sweetalert/dist/sweetalert.min.js'
            'pages/js/pages.js'
          ]
          '<%= build%>/js/builder.js': [
            'bower_components/survaider-builder/vendor/js/vendor.sans.jquery.js',
            'bower_components/survaider-builder/dist/formbuilder.js'
          ]
          '<%= build%>/domain/dashboard.vendor.js': [
            'bower_components/moment/moment.js'
            'bower_components/livestamp/livestamp.js'
            'bower_components/numeral/numeral.js'
            'bower_components/masonry/dist/masonry.pkgd.js'
          ]
          '<%= build%>/domain/analytics.vendor.js': [
          ]
          '<%= build%>/domain/builder.vendor.js': [
            'bower_components/nouislider/distribute/nouislider.js'
            'bower_components/moment/moment.js'
            'bower_components/livestamp/livestamp.js'
            'bower_components/ladda/dist/spin.min.js'
            'bower_components/ladda/dist/ladda.min.js'
          ]

      simplesurvey:
        # sourceMap: true
        options:
          separator: ';\n'
        files:
          '<%= build%>/js/simplesurvey.js': [
            'simplesurvey/js/vendor/modernizr-2.8.3.min.js'
            'simplesurvey/js/vendor/jquery.js'
            'simplesurvey/js/vendor/jquery-ui.min.js'
            'simplesurvey/js/vendor/angular-1.4.7/angular.js'
            'simplesurvey/js/vendor/angular-1.4.7/angular-animate.js'
            'simplesurvey/js/vendor/angular-1.4.7/angular-loading-bar.min.js'
            'simplesurvey/js/vendor/sortable.js'
            'simplesurvey/js/vendor/waypoints.js'
            'simplesurvey/js/vendor/classie.js'
            'bower_components/uri-template.js/dist/uri-template.js'
            'simplesurvey/js/app/models/Question.js'
            'simplesurvey/js/app/models/ShortTextQuestion.js'
            'simplesurvey/js/app/models/YesNoQuestion.js'
            'simplesurvey/js/app/models/SingleChoiceQuestion.js'
            'simplesurvey/js/app/models/GroupRatingQuestion.js'
            'simplesurvey/js/app/models/RankingQuestion.js'
            'simplesurvey/js/app/models/RatingQuestion.js'
            'simplesurvey/js/app/models/MultipleChoiceQuestion.js'
            'simplesurvey/js/app/models/LongTextQuestion.js'
            'simplesurvey/js/main.js'
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
            'bower_components/sweetalert/dist/sweetalert.css'
            'bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css'
            'pages/css/pages-icons.css'
            'pages/css/pages.css'
          ]
          '<%= build %>/css/builder.vendor.css': [
            'bower_components/survaider-builder/vendor/css/vendor.css'
          ]
          '<%= build%>/domain/dashboard.vendor.css': [
          ]
          '<%= build%>/domain/analytics.vendor.css': [
          ]
          '<%= build%>/domain/builder.vendor.css': [
            'bower_components/nouislider/distribute/nouislider.min.css'
            'bower_components/ladda/dist/ladda-themeless.min.css'
          ]
          '<%= build%>/domain/login.vendor.css': [
            'bower_components/bootstrap-social/bootstrap-social.css'
          ]

      simplesurvey:
        files:
          '<%= build %>/css/simplesurvey.css': [
            'simplesurvey/css/normalize.css'
            'simplesurvey/css/main.css'
            'simplesurvey/css/vendor/jquery-ui.min.css'
            'simplesurvey/css/vendor/jquery-ui.structure.min.css'
            'simplesurvey/css/vendor/jquery-ui.theme.min.css'
            'simplesurvey/css/style.css'
          ]

    uglify:
      dist:
        files:
          '<%= build %>/js/survaider.min.js': '<%= build %>/js/survaider.js'
          '<%= build %>/js/builder.min.js': '<%= build %>/js/builder.js'
          '<%= build %>/js/simplesurvey.min.js': '<%= build %>/js/simplesurvey.js'

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
      simplesurvey:
        expand: true
        src: 'simplesurvey/index.simplesurvey.html'
        dest: '<%= build %>'

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
          '<%= build %>/css/survaider.styles.css': 'assets/css/survaider.sass'
          '<%= build %>/domain/dashboard.css': 'src/sass/dashboard.sass'
          '<%= build %>/domain/analytics.css': 'src/sass/analytics.sass'
          '<%= build %>/domain/builder.css': 'src/sass/builder.sass'
          '<%= build %>/domain/login.css': 'src/sass/login.sass'

    watch:
      all:
        files: [
          'src/sass/*.sass'
          'src/coffee/*.coffee'
        ]
        tasks: ALL_TASKS
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
