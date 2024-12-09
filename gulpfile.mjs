import gulp from 'gulp';
import zip from 'gulp-zip';
import {deleteAsync, deleteSync} from 'del';

const FILES = [
    'background.js',
    'index.js',
    'manifest.json',
    'packed.js',
    'popup.html',
    'popup.js',
    'popup.css',
];

const IMAGE_FILES = [
    'icons/**/*',
]

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

export function images() {
    return gulp.src(IMAGE_FILES, { base: '.', encoding: false})
        .pipe(gulp.dest(BUILD_PATH + '/' + EXTENSION_FILENAME));
}

export function unpacked() {
    return gulp.src(FILES, { base: '.' })
        .pipe(gulp.dest(BUILD_PATH + '/' + EXTENSION_FILENAME));
}

gulp.task('default', gulp.series(clean, unpacked, images, packed));
