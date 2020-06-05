import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
    input: './src/index.js',
    output: {
        name: 'Vue',
        format: 'umd',
        file: 'dist/umd/vue.js',
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        process.env.Env === 'development' ? serve({
            open: true,
            openPage: './public/index.html',
            port: 9000,
            contentBase: '',
            host: 'localhost'
        }) : null
    ]

}