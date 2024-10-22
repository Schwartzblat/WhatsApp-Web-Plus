import gulp from 'gulp';
import zip from 'gulp-zip';
import {deleteAsync, deleteSync} from 'del';

const FILES = [
    'icons/**/*',
    'background.js',
    'index.js',
    'manifest.json',
    'packed.js',
    'popup.html',
    'popup.js',
    'popup.css',
];

const BUILD_PATH = 'build';
const EXTENSION_FILENAME = 'whatsapp-web-plus';

export function clean() {
    return deleteAsync(BUILD_PATH);
}

export function packed() {
    return gulp.src(FILES, { base: '.' })
        .pipe(zip(EXTENSION_FILENAME + '.zip'))
        .pipe(gulp.dest(BUILD_PATH));
}

export function unpacked() {
    return gulp.src(FILES, { base: '.' })
        .pipe(gulp.dest(BUILD_PATH + '/' + EXTENSION_FILENAME));
}

gulp.task('default', gulp.series(clean, unpacked, packed));
