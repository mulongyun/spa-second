module.exports=function(grunt){
    grunt.initConfig({
        htmlmin:{ 
            options:{
                removeComments:true,
                collapseWhitespace:true
            },
            files:{
                src:'./register.html',
                dest:'dist/register.html'
            }
        },
        cssmin:{ 
            'dist/register.css':'register.css'
        },
        uglify:{ 
            release:{
                files:{
                    'dist/register.js':'register.js'
                }
            }
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 1 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: './img', //原图存放的文件夹
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'dist/img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default',['htmlmin','cssmin','uglify','imagemin']);
};

