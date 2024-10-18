module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                banner: '/* global require */\nwindow.plus_main = () => {\n',
                footer: '\n};\nif (!window.is_plus_loaded) {\n    window.is_plus_loaded = true;\n    window.plus_main();\n}',
                separator: '\n\n',
                process: function(file) {
                    return file.split('\n').map(function(line) {
                        return '    ' + line;
                    }).join('\n');
                }
            },
            dist: {
                src: [
                    './scripts/hook.js',
                    './scripts/utils.js',
                    './scripts/modules.js',
                    './scripts/module_raid.js',
                    './scripts/settings.js',
                    './scripts/hook_renderer_function.js',
                    './scripts/process_renderable_messages.js',
                    './scripts/process_edited_messages.js',
                    './scripts/protobuf_hook.js',
                    './scripts/hook_send_message.js',
                    './scripts/hook_receipts.js',
                    './scripts/fullscreen.js',
                    './scripts/router.js',
                ],
                dest: './packed.js',
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
};
