const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = [
    // electron 主线程 ------------- start
    {
        mode: 'development',
        target: 'electron-main',
        entry: './src/electron/main.ts',
        output: {
            path: path.resolve(__dirname, 'dist/electron'),
            filename: '[name].bundle.js',
            clean: true,
        },
    },
    // electron 主线程 ------------- end

    // web 页面 ------------- start
    {

        mode: 'development',
        target: 'web',
        entry: './src/vue/main.ts',
        output: {
            path: path.resolve(__dirname, 'dist/web'),
            filename: '[name].bundle.js',
            clean: true,
        },
        devtool: 'inline-source-map',
        optimization: {
            //moduleIds: 'deterministic',
            //runtimeChunk: 'single',
            //splitChunks: {
            //    cacheGroups: {
            //        vendor: {
            //            test: /[\\/]node_modules[\\/]/,
            //            name: 'vendors',
            //            chunks: 'all',
            //        },
            //    },
            //},
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        //pluginOptions: {
        //    vuetify: {
        //        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        //    }
        //},
        plugins: [
            new webpack.DefinePlugin(
                {
                    __VUE_OPTIONS_API__: true,
                    __VUE_PROD_DEVTOOLS__: false,
                }
            ),
            new HtmlWebpackPlugin({ template: './public/index.html' }),
            new VueLoaderPlugin(),
            new VuetifyPlugin()
        ]
    }
    // web 页面 ------------- end
];