module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        react: {
            compile_jsx: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['**/*.js'],
                    dest: 'build',
                    ext: '.js'
                }]
            }
        },
        copy: {
            copy_css: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['store.css'],
                    dest: 'dist/'
                }]
            }
        },
        requirejs: {
            concatenate_modules: {
                options: {
                    optimize: 'none',
                    baseUrl: './build',
                    include: ['almondLib'],
                    name: "main",
                    out: "dist/reactjs-tutorial.js",
                    paths: {
                        libreact: '../bower_components/react/react-with-addons.min',
                        when: '../bower_components/when/when',
                        when_timeout: '../bower_components/when/timeout',
                        reqwest: '../bower_components/reqwest/reqwest',
                        almondLib: '../bower_components/almond/almond'
                    }
                }
            }
        },
        watch: {
            dev: {
                files: ['js/**.js', 'index.html'],
                tasks: ['dev'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['react:compile_jsx', 'requirejs:concatenate_modules', 'copy:copy_css']);

    grunt.registerTask('watch_dev', ['dev', 'watch:dev']);

    grunt.registerTask('default', ['watch_dev']);

};
