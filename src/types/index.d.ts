
// 接收视频直播地址和ID
export interface WsParam {
  url: string,
  index: string
}


// ws交互内容
export interface WsContent {
  index: string,
  content: string
}

// ws交互数据
export interface WsData {
  max: number,        // 存储最大为25帧
  queue: Array<any>,  // 队列
  labels: Array<WsLabel>
  socket: any,        // socker
  img: any,           // 图像对象
  timer: any,          // 定时器
  starttime: Date,
  curtime: Date,
  status: number
}

export interface WsLabel {
  label: string,
  warn: number,
  update: boolean
}

// 识别返回结果信息
export interface WsResult {
  index: string,
  starttime: Date,
  curtime: Date,
  status: number,
  content: any
}