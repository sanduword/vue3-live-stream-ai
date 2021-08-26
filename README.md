# 基于 Vue 3 + Vite + TypeScript + WebSocket 

为了提高实时视频流在AI识别领域的简单易用程度，本系统支持直播流（RTSP、RTMP、FLV、HLS） 在线场景智能识别，
只需要传一个流地址就能实现实时识别效果，当然目前的模型用的是开源的yolov4，在很多特定场景下会出现误识别
的情况，如何提高识别率这是后续的问题了，本系统仅供参考学习使用。

## 基于go版本的服务端

目前AI领域如何使用大部分还是基于python，如果您对goland在AI领域如何使用感兴趣，请查看[go-live-stream-ai](https://github.com/sanduword/go-live-stream-ai)

## 识别效果

![image](doc/0002.jpg)
![image](doc/0003.jpg)

### 目前存在问题

1. 目前只能debug，build还有点问题，后续再修复该问题；
2. 后续有时间再把css那块改成css module。
