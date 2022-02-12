//import
const path = require('path'); //전역 모듈
console.log("path: "+ path.resolve(__dirname, './dist'));
console.log("__dirname: "+ __dirname);

const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//export node.js환경

module.exports = {
    //파일을 읽어들이기 시작하는 진입점 설정
    entry: './js/main.js',
    //결과물(번들)을 반환하는 설정 =>path와 filename 설정안하면 dist 기본 저장
    output: {
        path: path.resolve(__dirname, './dist'), //__dirname nodejs 전역변수
        filename: 'main.js',
        clean: true// 기존 생성 파일 삭제하는 옵션
    },

    module:{
        rules:[
        {
            test:/\.s?css$/,// .css로 끝나는 것을 찾는다.
            use:[
                'style-loader',//먼저 해석됨
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test:/\.js$/,
            use:[
                'babel-loader'
            ]
        }
    ]
    },

    plugins: [
        new HtmlPlugin({
            template:  './index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'static', to: '' }
            ]
        })
    ],

    devServer:{
        host: 'localhost',
        port: 10000
    }
}