const path = require('path')// модуль nodejs
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// опередление режима сборки
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

// функция для названя файла, для develop - без хэша, для produc - c хэшем
// используем функцию в свойствах filename и в параметр нужное расширение
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

// Функция для добавления eslint в лоадеры js для режима development
const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	]

	if (isDev) {
		loaders.push('eslint-loader')
	}

	return loaders
}

module.exports = {
	// по умолчанию webpack в режиме разработки
	mode: 'development',

	// __dirname - абсолютный путь к папке проекта + src - папка с исходниками
	// возращает строку с абсолютным путём
	context: path.resolve(__dirname, 'src'),

	// входные точки для приложения (объект если больше одной, а если одна то строка)
	// для работы devServer необходимо пропускать через полфил бабел
	entry: ['@babel/polyfill', './index.js'],

	// выходной файл в который всё будет компилится
	output: {
		filename: filename('js'), // hash чтобы скачивалась актуальная версия, а не с кеша
		path: path.resolve(__dirname, 'dist')
	},

	// разрешения
	resolve: {

		// если webpack увидит файлы с одинаковым именем но с разыми
		// расширениями, он обработает первым с указанным расширением, а другие отклонит
		extensions: ['.js'],

		// упрощение указания пути к файлу
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		}
	},

	// добавляем source-map  в режим development
	devtool: isDev ? 'source-map' : false,

	// настройка автообновления браузера
	devServer: {
		port: 3000,
		hot: isDev,
	},
	target: isDev ? 'web' : 'browserslist',

	// плагины
	plugins: [
		new CleanWebpackPlugin(),

		new HTMLWebpackPlugin({
			// html файл который будет генерировать (т.к. context указывает путь к папке src, то просто указуем название)
			template: 'index.html', 
			minify: {
				removeComments: isProd, // минификация только в production
				collapseWhitespace: isProd,
			},
		}),

		new CopyPlugin({
			// копируем файлы
	      patterns: [
	        {
	        	from: path.resolve(__dirname, 'src/favicon.ico'),// откуда строка
	         to: path.resolve(__dirname, 'dist') // куда
	      	},
	      ],
	      options: {
	        concurrency: 100,
	      },
	    }),

		new MiniCssExtractPlugin({
			filename: filename('css')
		}),
	],

	// модули с лоэдарами
	 module: {
    rules: [
      {
      	// работа с sass файлами
        test: /\.s[ac]ss$/i, // scss или sass
        use: [
          {
          	loader: MiniCssExtractPlugin.loader,
          	options: {
          		/*hmr: isDev,
          		reloadAll: true*/
          	}
          },
          //  Translates CSS into CommonJS
          "css-loader",
          //  Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
      	// работа с js файлами, преобразуем в более старый код
        test: /\.m?js$/, // js
        exclude: /node_modules/, // кроме
        use: jsLoaders()
      },
    ],
  },
}