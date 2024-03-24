export default {
    source: {
        entry: {
            index: './index.tsx',
        },
    },
    server: {
        // htmlFallback: true,
        // historyApiFallback: {
        //     index: '/index.html',
        // },
    },
    output: {

    },
    tools: {
        rspack: (config) => {
            config.resolve =  {
                extensionAlias: {
                    '.js': ['.ts', '.tsx', '.js'],
                },
            }

            config.externalsType = 'module'
            config.externals=  {
                'socket:application': 'module socket:application',
                'socket:fs/promises': 'module socket:fs/promises',
            }

            config.module.rules.push({
                test: /\.tsx$/,
                use: {
                    loader: 'builtin:swc-loader',
                    options: {
                        sourceMap: true,
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                                jsx: true,
                            },
                            transform: {
                                react: {
                                    pragma: 'createElement',
                                    pragmaFrag: 'Fragment',
                                    throwIfNamespace: true,
                                    development: true,
                                    useBuiltins: true,
                                },
                            },
                        },
                    },
                },
                type: 'javascript/auto',
            })
        }
    }

};