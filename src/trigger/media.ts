import { task } from "@trigger.dev/sdk/v3";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";


export const cropImageTask = task({
  id: "crop-image",
  run: async (payload: { imageUrl: string, x?: number | string, y?: number | string, width?: number | string, height?: number | string }) => {
    try {
      const inputPath = `/tmp/input-${Date.now()}.jpg`;
      const outputPath = `/tmp/cropped-${Date.now()}.jpg`;

      console.log(`Downloading image from ${payload.imageUrl}`);
      // 1. Download the image first to avoid ffmpeg network issues
      const response = await fetch(payload.imageUrl);
      if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(inputPath, buffer);
      
      console.log(`Saved input to ${inputPath} (${buffer.length} bytes)`);

      // 2. Crop with ffmpeg
      console.log(`Original crop variables: w=${payload.width}, h=${payload.height}, x=${payload.x}, y=${payload.y}`);
      
      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .videoFilters(`crop=iw*${payload.width ?? 100}/100:ih*${payload.height ?? 100}/100:iw*${payload.x ?? 0}/100:ih*${payload.y ?? 0}/100`)
          .frames(1)
          .output(outputPath)
          .on('end', () => resolve(true))
          .on('error', (err) => reject(new Error(`FFmpeg crop failed: ${err.message}`)))
          .run();
      });

      // 3. Convert to base64
      const base64 = fs.readFileSync(outputPath, 'base64');
      const dataUrl = `data:image/jpeg;base64,${base64}`;
      
      // Cleanup
      try { 
        fs.unlinkSync(inputPath); 
        fs.unlinkSync(outputPath); 
      } catch(e) {}
      
      console.log('Successfully generated base64 result');
      return { url: dataUrl, status: "cropped via FFmpeg", path: outputPath };
    } catch (e: any) {
      // If error occurs, we still want to log it but fallback gracefully if needed
      console.error("Crop task error:", e);
      return { url: payload.imageUrl, error: e.message || "Failed to crop" };
    }
  }
});

export const extractFrameTask = task({
  id: 'extract-frame',
  run: async (payload: { videoUrl: string, timestamp?: string }) => {
    try {
      const input = '/tmp/vid-' + Date.now() + '.mp4';
      const output = '/tmp/img-' + Date.now() + '.jpg';
      const res = await fetch(payload.videoUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(input, buf);
      const time = payload.timestamp?.includes('%') ? '00:00:01' : (payload.timestamp || '00:00:01');
      await new Promise((resolve, reject) => { ffmpeg(input).seekInput(time).frames(1).output(output).on('end', () => resolve(true)).on('error', (err) => reject(new Error(err.message))).run(); });
      const b64 = fs.readFileSync(output, 'base64');
      try { fs.unlinkSync(input); fs.unlinkSync(output); } catch(e){}
      return { url: 'data:image/jpeg;base64,' + b64, status: 'extracted', path: output };
    } catch (e: any) {
      console.error('Frame extraction failed:', e);
      return { url: 'https://placehold.co/800x600/png?text=Extraction+Failed:\n' + encodeURIComponent(e.message), error: e.message };
    }
  }
});