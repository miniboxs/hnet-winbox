// rollup.config.js
import babel from '@rollup/plugin-babel';
import deletePlugin from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.mjs',
        format: 'es'
    },
    plugins: [
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env']
        }),
        deletePlugin({ targets: [] }),
        postcss({
            extensions: ['.css'],
            extract: true, // 这会将 CSS 提取到单独的文件中
            minimize: true // 压缩 CSS
        }),
        copy({
            targets: [
                { src: 'src/assets/*', dest: 'dist/assets' }
            ]
        })
    ],
    external: []
};
