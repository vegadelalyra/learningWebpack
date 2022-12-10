// ? GUIDE FOR YOUR WEBPACK CONFIGURATION
// ! webpack is a JS/JSON MODULE BUNDLER COMPILER
// * this means: bundle a huge type of JS assets 
// * into a single file and then compiles it.
// ! Handling the process modularly.
// You give webpack entry points, webpack processes them and outputs a folder with all bundled.


// node.js module to address THIS folder through OS
//webpack requires it to navigate through folders and files.
const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CopyPlugin = require('copy-webpack-plugin'),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    DotEnv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


/** @type
{import('webpack').Configuration} */
// ? platzi comment code: webpack predefined configuration.

// * HERE STARTS THE DASHBOARD FOR OUR MODULES 
module.exports = {
    // ? Entry points of our application
    entry: './src/index.js',
    // ? Result of webpack modules bundler
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    // ? Extensions or dependencies required for this project.
    resolve: {
        extensions: ['.js'],
        alias: { // @alias to get shorter paths or filenames (a kind of variables from webpack)
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    // ? configuration for modules added to our webpack dashboard.
    module: {
        // rules for these modules
      rules: [ // we want to add babel
            {
                test: /\.m?js$/, // search .mjs format, that means modules
                exclude: /node_modules/, // exclude, of course, all node dependencies
                use: { // ! LOADERS ALLOWS WEBPACK TO PROCESS FILE TYPES DIFFERENT FROM .js/.json
                    loader: 'babel-loader' // do use the babel interpreter (transpiler of JS ES6/2015+)
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    },
                }
            }
        ]
    },
    plugins: [ // we add html to our webpack
        new HtmlWebpackPlugin( {
            inject: true,                       // insert all html elements
            template: './public/index.html',    // input or entry point
            filename: './index.html'            // output or exit point
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new DotEnv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
} 

/***************************************************************************************************
 *                FUERA DE CONTEXTO, WEBPACK SOLAMENTE ENTIENDE JAVASCRIPT Y JSON.                *
 *      LOS LOADERS NOS PERMITE PROCESAR ARCHIVOS DE OTROS TIPOS PARA CONVERTIRNOS EN MÓDULOS     *
 *      VÁLIDOS QUE SERÁN CONSUMIDOS POR NUESTRAS APLICACIONES Y AGREGADAS COMO DEPENDENCIAS.      *
 *                EN ALTO NIVEL, LOS LOADERS POSEEN 2 CONFIGURACIONES PRINCIPALES:                 *
 *            TEST - PROPIEDAD QUE IDENTIFICA CUÁLES ARCHIVOS DEBERÁN SER TRANSFORMADOS            *
 *   USE - PROPIEDAD QUE IDENTIFICA EL LOADER QUE SERÁ USADO PARA TRANSFORMAR A DICHOS ARCHIVOS    *
 *                                             PLUGINS                                             *
 *                   MIENTRAS LOS LOADERS TRANSFORMAN CIERTOS TIPOS DE MÓDULOS,                   *
 *                  LOS PLUGINS _SON UTILIZADOS PARA EXTENDER TAREAS ESPECÍFICAS,                 *
 * COMO LA OPTIMIZACIÓN DE PAQUETES, LA GESTIÓN DE ACTIVOS Y LA INYECCIÓN DE VARIABLES DE ENTORNO. *
 *      UNA VEZ IMPORTADO EL PLUGIN, PODEMOS DESEAR EL PERSONALIZARLOS A TRAVÉS DE OPCIONES.       *
 ***************************************************************************************************/