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
