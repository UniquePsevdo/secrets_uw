const path = require('path');
const resolve = path.resolve;
const { AngularCompilerPlugin, PLATFORM } = require('@ngtools/webpack');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const compression = require('compression-webpack-plugin');
const html = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const portfinder = require('portfinder');
const nodeModules = resolve(__dirname, 'node_modules');
const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "app"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";

const postcssPlugins = function () {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
        autoprefixer: false,
        safe: true,
        mergeLonghand: false,
        discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
    };
    return [
        postcssUrl({
            url: (URL) => {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                if (!URL.startsWith('/') || URL.startsWith('//')) {
                    return URL;
                }
                if (deployUrl.match(/:\/\//)) {
                    // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                    return `${deployUrl.replace(/\/$/, '')}${URL}`;
                }
                else if (baseHref.match(/:\/\//)) {
                    // If baseHref contains a scheme, include it as is.
                    return baseHref.replace(/\/$/, '') +
                        `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
                else {
                    // Join together base-href, deploy-url and the original URL.
                    // Also dedupe multiple slashes into single ones.
                    return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
            }
        }),
        autoprefixer(),
        customProperties({ preserve: true })
    ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

module.exports = function (options, webpackOptions) {
    options = options || {};

    let config = {};
    let entry = {};

    if (webpackOptions.p) {
        entry = {app: root('src/main.prod.ts')};
    } else {
        entry = {app: root('src/main.ts')};
    }

    config = webpackMerge({}, config, {
        target: 'web',
        entry: entry,
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: ['node_modules', nodeModules],
            alias: {
                'assets': resolve(__dirname, 'src/assets/'),
            }
        },

        resolveLoader: {
            modules: [nodeModules, 'node_modules']
        },
        module: {
            /*rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeAttributeQuotes: false,
                        caseSensitive: true,
                        customAttrSurround: [[/#/, /(?:)/], [/\*!/, /(?:)/], [/\[?\(?/, /(?:)/]],
                        customAttrAssign: [/\)?\]?=/]
                    }
                },
                {test: /\.json$/, loader: 'json-loader'},
                /!*{
                    test: /\.(jp?g|png|gif)$/,
                    loader: 'file-loader',
                    options: {hash: 'sha512', digest: 'hex', name: 'assets/images/[hash].[ext]', publicPath: '../',}
                }*!/
                /!*{
                    "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                    "loader": "url-loader",
                    "options": {
                        "name": "[name].[hash:20].[ext]",
                        "limit": 10000
                    }
                },*!/
                /!*{
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options:{
                                limit: 10000,
                                // Output below the fonts directory
                                name: 'assets/images/[name].[ext]',
                                // Tweak publicPath to fix CSS lookups to take
                                // the directory into account.
                                publicPath: '../',
                            }
                        },
                        'image-webpack-loader?'
                    ]
                }*!/
                {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                    loader: 'file-loader', // <-- retain original file name,
                    options: {
                        // Output below the fonts directory
                        name: 'assets/images/[name].[ext]',
                        // Tweak publicPath to fix CSS lookups to take
                        // the directory into account.
                        publicPath: '../',
                    }
                },
                /!*{
                    test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/,
                    loader: 'file-loader',
                    options: {hash: 'sha512', digest: 'hex', name: 'assets/fonts/[hash].[ext]'}
                }*!/
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader",
                    options:{
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        // Output below the fonts directory
                        name: 'assets/fonts/[name].[ext]',
                        // Tweak publicPath to fix CSS lookups to take
                        // the directory into account.
                        publicPath: '../',
                    }
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: "file-loader",
                    options:{
                        // Output below the fonts directory
                        name: 'assets/fonts/[name].[ext]',
                        // Tweak publicPath to fix CSS lookups to take
                        // the directory into account.
                        publicPath: '../',
                    }
                }
            ]*/
            rules: [
                {
                    "test": /\.html$/,
                    "loader": "raw-loader"
                },
                {
                    "test": /\.(eot|svg|cur)$/,
                    "loader": "file-loader",
                    "options": {
                        "name": "[name].[hash:20].[ext]",
                        "limit": 10000
                    }
                },
                {
                    "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                    "loader": "url-loader",
                    "options": {
                        "name": "[name].[hash:20].[ext]",
                        "limit": 10000
                    }
                },
                {
                    "exclude": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.css$/,
                    "use": [
                        "exports-loader?module.exports.toString()",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        }
                    ]
                },
                {
                    "exclude": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.scss$|\.sass$/,
                    "use": [
                        "exports-loader?module.exports.toString()",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        },
                        {
                            "loader": "sass-loader",
                            "options": {
                                "sourceMap": false,
                                "precision": 8,
                                "includePaths": []
                            }
                        }
                    ]
                },
                {
                    "exclude": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.less$/,
                    "use": [
                        "exports-loader?module.exports.toString()",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        },
                        {
                            "loader": "less-loader",
                            "options": {
                                "sourceMap": false
                            }
                        }
                    ]
                },
                {
                    "exclude": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.styl$/,
                    "use": [
                        "exports-loader?module.exports.toString()",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        },
                        {
                            "loader": "stylus-loader",
                            "options": {
                                "sourceMap": false,
                                "paths": []
                            }
                        }
                    ]
                },
                {
                    "include": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.css$/,
                    "use": [
                        "style-loader",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        }
                    ]
                },
                {
                    "include": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.scss$|\.sass$/,
                    "use": [
                        "style-loader",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        },
                        {
                            "loader": "sass-loader",
                            "options": {
                                "sourceMap": false,
                                "precision": 8,
                                "includePaths": []
                            }
                        }
                    ]
                },
                {
                    "include": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.less$/,
                    "use": [
                        "style-loader",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        },
                        {
                            "loader": "less-loader",
                            "options": {
                                "sourceMap": false
                            }
                        }
                    ]
                },
                {
                    "include": [
                        path.join(process.cwd(), "src/styles.scss")
                    ],
                    "test": /\.styl$/,
                    "use": [
                        "style-loader",
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": false,
                                "importLoaders": 1
                            }
                        },
                        {
                            "loader": "postcss-loader",
                            "options": {
                                "ident": "postcss",
                                "plugins": postcssPlugins
                            }
                        },
                        {
                            "loader": "stylus-loader",
                            "options": {
                                "sourceMap": false,
                                "paths": []
                            }
                        }
                    ]
                },
                {
                    "test": /\.ts$/,
                    "loader": "@ngtools/webpack"
                }
            ]
        },
        plugins: [
            new copy([
                {
                    "context": "src",
                    "to": "",
                    "from": {
                        "glob": "assets/**/*",
                        "dot": true
                    }
                },
                {
                    "context": "src",
                    "to": "",
                    "from": {
                        "glob": "favicon.ico",
                        "dot": true
                    }
                }
            ], {
                "ignore": [
                    ".gitkeep"
                ],
                "debug": "warning"
            }),
        ],
        stats: 'minimal'
    });

    config = webpackMerge({}, config, {
        output: {
            path: root('dist/browser'),
            filename: 'js/[name].bundle.js',
            chunkFilename: 'js/[id].chunk.js'
        },
        devServer: {
            historyApiFallback: true,
            port: 8000,
            open: true,
            hot: false,
            inline: true,
            overlay: true,
            stats: 'minimal',
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        }
    });

    config = webpackMerge({}, config, {
        plugins: [
            new html({
                template: root('src/index.html'),
                output: !options.server ? root('dist/browser') : root('dist/server'),
                chunksSortMode: sort = (left, right) => {
                    let leftIndex = entryPoints.indexOf(left.names[0]);
                    let rightindex = entryPoints.indexOf(right.names[0]);
                    if (leftIndex > rightindex) {
                        return 1;
                    } else if (leftIndex < rightindex) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            })
        ]
    });

    if (webpackOptions.p) {
        config = webpackMerge({}, config, getProductionPlugins());
    } else {
        config = webpackMerge({}, config, getDevelopmentConfig());
    }

    config = webpackMerge({}, config, stylesConfig());

    config = webpackMerge({}, config, {
        module: {
            rules: [{test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, loader: '@ngtools/webpack'}]
        },
        plugins: [
            new AngularCompilerPlugin({
                tsConfigPath: 'src/tsconfig.client.json'
            })
        ]
    });

    if (options.serve) {
        return portfinder.getPortPromise().then(port => {
            config.devServer.port = port;
            return config;
        });
    } else {
        return Promise.resolve(config);
    }
}

function root(path) {
    return resolve(__dirname, path);
}

function getDevelopmentConfig() {
    return {
        devtool: 'inline-source-map',
        module: {
            rules: [
                {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [nodeModules]}
            ]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                minChunks: Infinity,
                name: 'inline'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['app'],
                minChunks: module => {
                    return module.resource && module.resource.startsWith(nodeModules)
                }
            })
        ]
    };
}

function getProductionPlugins() {
    return {
        plugins: [
            new compression({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    };
}

function stylesConfig() {
    return {
        plugins: [
            new extract('css/[hash].css')
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: extract.extract({fallback: 'style-loader', use: 'css-loader?url=false'}),
                    include: [root('src/styles')]
                },
                {test: /\.css$/, use: ['to-string-loader', 'css-loader?url=false']},
                {
                    test: /\.scss$|\.sass$/,
                    loader: extract.extract({fallback: 'style-loader', use: ['css-loader?url=false', 'sass-loader']}),
                    exclude: [root('src/app/components'), root('node_modules')]
                },
                {
                    test: /\.scss$|\.sass$/,
                    use: ['to-string-loader', 'css-loader?url=false', 'sass-loader'],
                    include: [root('src/app/components')]
                }
            ]
        }
    };
}
