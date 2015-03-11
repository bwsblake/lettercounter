var path = require('path');

var publicDir = 'lettercounter/static';
var jsDir = path.join(publicDir, 'js');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jade: {
            options: {
                namespace: false,
                client: true,
                amd: true,
            },
            files: {
                expand: true,
                cwd: jsDir,
                src: [
                    '**/*.jade',
                    '!**/_*.jade',
                ],
                dest: jsDir,
                ext: '.tmpl.js',
            },
        },

        watch: {
            jade: {
                files: '**/*.jade',
                tasks: ['build-jade'],
                options: {
                    interrupt: true,
                },
            },
        },


        less: {
            compile: {
                options: {
                    cleancss: true,
                },
                files: [{
                    expand: true,
                    cwd: publicDir,
                    src: [
                        '**/*.less',
                        '!**/_*.less',
                        '!bower_components/**/*.less'
                    ],
                    dest: publicDir,
                    ext: '.css',
                }],
            },
        },

    });

    grunt.task.loadNpmTasks('grunt-newer');
    grunt.task.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('build-jade', ['newer:jade']);
    grunt.registerTask('build', ['build-jade', 'less']);
    grunt.registerTask('default', ['build']);

};
