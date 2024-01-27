module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                banner: 'const main = () => {\n',
                footer: '\n};\nmain();',
                separator: '\n\n',
            },
            dist: {
                src: [
                    './scripts/module_raid.js',
                    './scripts/modules.js',
                    './scripts/process_renderable_messages.js',
                    './scripts/process_edited_messages.js',
                    './scripts/router.js',
                ],
                dest: './packed.js',
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
};
