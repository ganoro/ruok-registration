// Generated on 2014-05-29 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var modRewrite = require('connect-modrewrite');

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        bower: 'bower_components'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            //ts: {
            //    files: ['<%= config.app %>/scripts/**/*.ts'],
            //    tasks: ['typescript']
            //},
            simple_include: {
                files: ['<%= config.app %>/**/*.{html,tpl}'],
                tasks: ['simple_include:server']
            },
            //jade: {
            //    files: ['<%= config.app %>/{,*/}*.jade'],
            //    tasks: ['jade']
            //},
            js: {
                files: ['<%= config.app %>/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: 33333
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: ['<%= config.app %>/**/*.{scss,sass}'],
                tasks: ['compass:server'] //, 'autoprefixer'
            },
            styles: {
                files: ['<%= config.app %>/**/*.css'],
                tasks: ['newer:copy:server'] // , 'autoprefixer'
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/**/*.{html,tpl}',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9999,
                open: true,
                livereload: 33333,
                hostname: 'localhost' // Change this to '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: true,
                    port: 9998,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['dist']
                }]
            },
            server: {
                files: [{
                    dot: true,
                    src: [ '.tmp', '.sass-cache']
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: [
                //'Gruntfile.js',
                //'<%= config.app %>/scripts/{,*/}*.js',
                //'!<%= config.app %>/scripts/vendor/*',
                //'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Import static file
        simple_include: {
            server: {
                src: ['<%= config.app %>/**/*.html'],
                dest: '.tmp/'
            },
            dist: {
                src: ['<%= config.app %>/**/*.html'],
                dest: 'dist/'
            }
        },

        // Compiles TypeScript to JavaScript
        typescript: {
            base: {
                src: ['<%= config.app %>/scripts/**/*.ts'],
                dest: '<%= config.app %>/scripts',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    basePath: '<%= config.app %>/scripts',
                    sourceMap: false,
                    declaration: false,
                    comments: true
                }
            }
        },
        jade: {
            options: {
                pretty: true,
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '.tmp',
                    src: '*.jade',
                    ext: '.html'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: '*.jade',
                    ext: '.html'
                }]
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                cssDir: '.tmp/styles',
                sassDir: '<%= config.app %>/styles',
                imagesDir: '<%= config.app %>/images',
                fontsDir: '<%= config.app %>/fonts',
                generatedImagesDir: '<%= config.app %>/images/generated',
                generatedImagesPath:'<%= config.app %>/images/generated',
                javascriptsDir: '<%= config.app %>/scripts',
                httpGeneratedImagesPath:'../images/generated',
                httpImagesPath: '../images',
                httpFontsPath: '../fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                noLineComments: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= config.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: [
                    '<%= config.app %>/{,*/}*.html'
                ],
                exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
            },
            sass: {
                src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}']
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },
        
        uglify: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/modules',
                    src: '<%= config.app %>/modules/*.js',
                    dest: '<%= config.dist %>/scripts'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/fonts',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/fonts'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        imagemin: {
            dynamic: {
                options: {                              // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,                       // Enable dynamic expansion
                    cwd: '<%= config.app %>/images',   // Src matches are relative to this path
                    src: ['**/*.{gif,jpeg,jpg,png}'],        // Actual patterns to match
                    dest: '<%= config.dist %>/images'          // Destination path prefix
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            common:{
                files: 
                [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'web.config',
                        'sitemap.xml',
                        '{,*/}*.html',
                        'fonts/{,*/}*.*'
                    ]
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/data/',
                    dest: '<%= config.dist %>/data/',
                    src: '**'
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/images/',
                    dest: '<%= config.dist %>/images/',
                    src: '**'
                }]
            },
            dev: {
                files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/scripts/',
                    dest: '<%= config.dist %>/scripts/',
                    src: '**/*.*'
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/angularjs/',
                    dest: '<%= config.dist %>/angularjs/',
                    src: '**'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/scripts/',
                    dest: '<%= config.dist %>/scripts/',
                    src: '{,*/}dev.js'
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/angularjs/',
                    dest: '<%= config.dist %>/angularjs/',
                    src: '**/*.tpl'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '.tmp/',
                    src: [
                        'styles/{,*/}*.css',
                        'fonts/{,*/}*.*'
                    ]
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.bower %>/bootstrap-sass-official/assets/fonts/bootstrap/',
                    dest: '.tmp/fonts/',
                    src: '{,*/}*.*'
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'compass:server',
                //'typescript',
                'simple_include:server',
                //'jade:server',
                'copy:server'
            ],
            test: [
                'copy:server'
            ],
            dist: [
                'bowerInstall',
                'compass',
                //'typescript',
                //'jade:dist',
                'copy:common',
                'copy:dist',
                'simple_include:dist'
            ],
            dev: [
                'bowerInstall',
                'compass',
                //'typescript',
                //'jade:dist',
                'copy:common',
                'copy:dev',
                'simple_include:dist'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'autoprefixer'
    ]);
    grunt.registerTask('dev', [
        'clean:dist',
        'concurrent:dev',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:dev',
        'usemin',
    ]);

    grunt.registerTask('clear', [
        'clean:server',
        'clean:dist'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};