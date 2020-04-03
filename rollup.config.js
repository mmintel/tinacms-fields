import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import path from 'path';

const { LERNA_PACKAGE_NAME } = process.env;
const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.js');
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, 'dist');
// eslint-disable-next-line import/no-dynamic-require
const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));
const IS_BROWSER_BUNDLE = !!PKG_JSON.browser;

const LOCAL_GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

const formats = IS_BROWSER_BUNDLE ? ['umd'] : ['es', 'cjs'];

export default formats.map((format) => ({
  input: INPUT_FILE,
  external: [
    'react',
    'react-dom',
    'prop-types',
    '@tinacms/styles',
    '@tinacms/icons',
    'react-is',
  ],
  output: {
    file: path.join(OUTPUT_DIR, `index.${format}.js`),
    format,
    sourcemap: true,
    name: LERNA_PACKAGE_NAME,
    globals: LOCAL_GLOBALS,
    amd: {
      id: LERNA_PACKAGE_NAME,
    },
  },
  plugins: [
    external(),
    babel({
      exclude: [
        'node_modules/**',
        '../../node_modules/**',
      ],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    resolve(),
    commonjs(),
  ],
}));
