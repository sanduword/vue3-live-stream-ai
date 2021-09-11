import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// https://cn.vitejs.dev/config/#config-intellisense 配置文件说明

// 开发环境配置
const devConfig = {
  plugins: [vue()],
  server: {
    host: "0.0.0.0", // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址
    port: 3001,
    open: true, // 是否自动在浏览器打开
    cors: true
  },
  css: {
    
  }
}

// 生产环境配置
const proConfig = {
  plugins: [vue()],
  base: '/' // 如果有别名，例如/live-ai
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return devConfig
  } else {
    return proConfig
  }
})