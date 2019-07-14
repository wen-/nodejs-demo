"use strict";

const Controller = require("egg").Controller;
const sendToWormhole = require("stream-wormhole");
const fs = require("mz/fs");
const path = require("path");

class UploadController extends Controller{
  async index(){
    // 两种获取文件的方式，一种是File:直接获取缓存目录的文件；一种是Stream:获取文件流；
    const { ctx } = this;
    // file方式
    // const file = ctx.request.files[0];
    // 流方式
    const stream = await ctx.getFileStream();

    const name = "app/public/uploads/" + path.basename(stream/*file*/.filename);


    let result;
    try{
      // 处理文件，比如上传到云端
      // result = await ctx.oss.put(name, file.filepath);

      // file方式处理
      // const res = await fs.copyFile(file.filepath, name);
      // if(res){
      //   console.log("上传失败");
      // }else{
      //   result = path.join(ctx.req.headers.host, name);
      // }

      result = await new Promise((resolve, reject) => {
        const remoteFileStream = fs.createWriteStream(name);
        stream.pipe(remoteFileStream);
        let errFlag;
        remoteFileStream.on("error", err => {
          errFlag = true;
          sendToWormhole(stream);
          remoteFileStream.destroy();
          reject(err);
        });

        remoteFileStream.on("finish", async () => {
          if (errFlag) return;
          // stream.fields可获取除文件外的其它字段
          resolve({ filename: stream.filename, name: stream.fields.title });
        });
      });


    }catch(err){
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }finally{
      // 需要删除临时文件
      // await fs.unlink(file.filepath);
    }

    ctx.body = {
      url: result,
      // 获取所有的字段值
      requestBody: ctx.request.body,
    };
  }
}

module.exports = UploadController;
