import { IOUtils } from './utils/ioutils';
import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as nodeExternals from 'webpack-node-externals';
import * as yargs from 'yargs';

export class BaseConfig {
	public paths: any;
	public ignored: any;
	public rules: any;
	public webpack: any;

	constructor() {
		this.rules = {
			tslint: {
				test: /\.ts$/,
				loader: 'tslint-loader',
				enforce: 'pre',
				options: {
					formatter: 'stylish',
					emitErrors: true,
					typeCheck: true,
					tsConfigFile: IOUtils.pathHelper('tsconfig.json'),
				},
				exclude: /node_modules/
			},
			ts: {
				test: /\.tsx?$/,
				use: [
					{
						loader: 'happypack/loader',
						options: {
							id: 'ts'
						}
					},
				],
				exclude: /node_modules/
			},
			happyTS: {
				id: 'ts',
				threads: 2,
				loaders: [{
					path: 'ts-loader',
					query: {
						happyPackMode: true,
						transpileOnly: true
					}
				}],
			},
			raw: {
				test: /\.pem$/,
				loader: 'raw-loader'
			}
		};
		this.webpack = {
			watch: yargs.argv.watch,
			target: 'node',
			entry: { server: IOUtils.pathHelper('src/server.ts') },
			output: {
				path: IOUtils.pathHelper('dist/'),
				filename: '[name].js'
			},
			watchOptions: {
				ignored: /node_modules/,
				poll: 300,
			},
			stats: {
				colors: true,
				cached: false,
				timings: true
			},
			devtool: 'cheap-module-inline-source-map',
			resolve: {
				modules: [
					IOUtils.baseDir,
					IOUtils.pathHelper('node_modules/')
				],
				extensions: [
					'.json', '.ts', '.tsx',
					'.js', '.jsx'
				],
			},
			externals: [nodeExternals()],
			module: {
				rules: [
					this.rules.tslint, this.rules.ts, this.rules.raw
				]
			},
			plugins: [
				new ForkTsCheckerWebpackPlugin({
					tsconfig: IOUtils.pathHelper('tsconfig.json')
				}),
				new HappyPack(this.rules.happyTS),
			]
		};
	}
}
