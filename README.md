用express框架搭建的一个简单的nodejs项目，实现图片的单张，多张上传和图片的预览功能

下载项目：

git clone https://github.com/zifang/express-nodejs.git

切换项目到dev分支：

git checkout dev

安装相关的依赖：

npm install

启动项目：

npm run start 

如下图所示上传图片：

![image](https://github.com/zifang/express-nodejs/blob/master/public/images/uploadBefore.png)

图片上传成功页面，图片被上传到了public/images目录下：

![image](https://github.com/zifang/express-nodejs/blob/master/public/images/success.png)


访问127.0.0.1://3000/images/filename,预览图片：

![image](https://github.com/zifang/express-nodejs/blob/master/public/images/view.png)