import { task } from "@trigger.dev/sdk/v3";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const cropImageTask = task({
  id: "crop-image",
  run: async (payload: { imageUrl: string, x?: number, y?: number, width?: number, height?: number }) => {
    return new Promise((resolve, reject) => {
      const outputPath = `/tmp/cropped-${Date.now()}.jpg`;
      
      const cmd = ffmpeg(payload.imageUrl)
        .videoFilters(`crop=${payload.width || 100}:${payload.height || 100}:${payload.x || 0}:${payload.y || 0}`)
        .output(outputPath)
        .on('end', () => {
           try {
             const base64 = fs.readFileSync(outputPath, 'base64');
             const dataUrl = `data:image/jpeg;base64,${base64}`;
             fs.unlinkSync(outputPath);
             resolve({ url: dataUrl, status: "cropped via FFmpeg", path: outputPath });
           } catch(e) {
             resolve({ url: payload.imageUrl, error: "Failed to read file" });
           }
        })
        .on('error', (err) => resolve({ url: payload.imageUrl, error: err.message }));
      
      cmd.run();
    });
  }
});

export const extractFrameTask = task({
  id: "extract-frame",
  run: async (payload: { videoUrl: string, timestamp?: string }) => {
    return new Promise((resolve, reject) => {
      const outputPath = `/tmp/frame-${Date.now()}.jpg`;
      const time = payload.timestamp?.includes('%') ? '00:00:01' : (payload.timestamp || '00:00:01');
      
      const cmd = ffmpeg(payload.videoUrl)
        .seekInput(time)
        .frames(1)
        .output(outputPath)
        .on('end', () => {
           try {
             const base64 = fs.readFileSync(outputPath, 'base64');
             const dataUrl = `data:image/jpeg;base64,${base64}`;
             fs.unlinkSync(outputPath);
             resolve({ url: dataUrl, status: "extracted via FFmpeg", path: outputPath });
           } catch(e) {
             resolve({ url: "https://via.placeholder.com/800x600?text=FFmpeg+Mock+Frame", error: "Failed to read file" });
           }
        })
        .on('error', (err) => resolve({ url: "https://via.placeholder.com/800x600?text=FFmpeg+Mock+Frame", error: err.message }));
      
      cmd.run();
    });
  }
});
