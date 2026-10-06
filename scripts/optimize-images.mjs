// 图片压缩脚本：读取 images-src/ 的原图，压缩后输出到 public/images/
// 使用方法：npm run images

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "images-src";      // 原图文件夹（不会上传到网站）
const OUT = "public/images";   // 网站使用的图片文件夹
const MAX_WIDTH = 1920;        // 最大宽度，超过的会等比缩小
const QUALITY = 78;            // JPEG 质量，78 在清晰度和体积之间比较平衡

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((file) =>
    exts.has(path.extname(file).toLowerCase())
);

for (const file of files) {
    // 统一输出为 .jpg，文件名不变
    const outputName = `${path.parse(file).name}.jpg`;
    const input = path.join(SRC, file);
    const output = path.join(OUT, outputName);

    await sharp(input)
        .rotate() // 按照片的拍摄方向自动纠正
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(output);

    const before = Math.round((await stat(input)).size / 1024);
    const after = Math.round((await stat(output)).size / 1024);
    console.log(`${file} → ${outputName}：${before} KB → ${after} KB`);
}

console.log(`完成，共处理 ${files.length} 张图片。`);