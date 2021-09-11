<template>
  <div class="home">
    <Header />
    <div class="content">
      <LiveAi ref="comLiveRef" v-if="state.isAnaly && !state.loading"/>
      <LiveData ref="comDataRef" v-if="state.isAnaly && !state.loading"/>
      <div class="not" v-if="!state.isAnaly && !state.loading">{{state.err}}</div>
      <Loading v-if="state.isAnaly && state.loading" />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { WsParam, WsData, WsContent, WsResult, WsLabel } from '../types/index'
import { query } from '../utils/common'
export default defineComponent({
  name:"Home",
  components:{
    Header: defineAsyncComponent(() => import("../components/Header.vue")),
    Footer: defineAsyncComponent(() => import("../components/Footer.vue")),
    LiveAi: defineAsyncComponent(() => import("../components/LiveAi.vue")),
    LiveData: defineAsyncComponent(() => import("../components/LiveData.vue")),
    Loading: defineAsyncComponent(() => import("../components/Loading.vue"))
  },
  setup() {
    const state = reactive({
      wsUrl: 'ws://127.0.0.1:8068/execstream',
      loading: false,
      imgBase: null,
      isAnaly: false,
      err:'',
      params:  {
        index: '',
        url: ''
      } as WsParam,
      wsData: {
        max: 25,
        queue: new Array(),
        labels: new Array<WsLabel>(),
        socket: null,
        img: new Image(),
        timer: null
      } as WsData
    })

    const route = useRoute()
    const comLiveRef = ref<any>(null)
    const comDataRef = ref<any>(null)

    // 初始化
    const initWs = (): void => {
      if (route.query && route.query.index && route.query.url) {
        state.params.index = route.query.index.toString()
        state.params.url = route.query.url.toString()
      } else {
        state.isAnaly = false
        state.err = '需要传入有效的index和url参数'
        return
      }

      if (!window["WebSocket"]) {
        state.isAnaly = false
        state.err = '浏览器不支持websocket'
        return
      }

      state.isAnaly = true
      state.loading = true
      let url = state.wsUrl + `?index=${state.params.index}&url=${state.params.url}`
      state.wsData.socket = new WebSocket(url)

      // 打开
      state.wsData.socket.onopen = () => {
        wsSend('连接ws服务端...')
        state.loading = false
      }

      // 关闭
      state.wsData.socket.onclose = (e: any) => {
        if (e.wasClean) {
          console.error("服务端已关闭", e.code, e.reason)
        } else {
          console.error("网络被中断...")
        }
      }

      // 接收消息
      state.wsData.socket.onmessage = (e: any) => {
        if (Object.prototype.toString.call(e.data) === '[object String]') {
          let result:WsResult = JSON.parse(e.data)
          state.wsData.status = result.status
          state.wsData.starttime = result.starttime
          state.wsData.curtime = result.curtime
          if (result.status === 1) {
            wsLabels(result.content)
          } else {
            console.info('连接ws服务端', result.content)
          }
        }else if (Object.prototype.toString.call(e.data) === '[object Blob]'){
          wsPush(e.data)
        }else{
          console.error('不支持的类型',e.data)
        }
      }

      // 错误
      state.wsData.socket.onerror = (e: any) => {
        console.error("socket遇到错误", e.message)
      }

      wsRender()
    }

    // 发送消息
    const wsSend = (content: string): void => {
      if (!state.wsData.socket) return
      let data = {
        index: state.params.index,
        content: content
      } as WsContent

      let jsonStr = JSON.stringify(data)
      state.wsData.socket.send(jsonStr)
    }

    // 入栈
    const wsPush = (data: any): void => {
      if (state.wsData.queue.length >= state.wsData.max) {
        state.wsData.queue.shift()
        console.log(`队列已达到最大值：${state.wsData.max}，已移除第一个`)
      }

      // 末尾添加
      state.wsData.queue.push(data)
    }

    // 出栈
    const wsOut = (): any => {
      if (state.wsData.queue.length === 0) {
        return null
      }

      return state.wsData.queue.shift();
    }

    // 渲染label
    const wsLabels = (labels: any): void => {
      if (!labels) return
      labels.forEach((item: WsLabel) => {
        let result = getLabel(item.label)
        if (result) {
          if (item.warn > result.warn) {
            result.warn = item.warn
            result.update = true
          } else {
            result.update = false
          }
        } else {
          item.update = true
          state.wsData.labels.push(item)
        }
      });

      // 排序
      state.wsData.labels.sort((a,b)=> a.warn > b.warn ? -1:1 )
      comDataRef.value.reviceLabels(state.wsData.labels)
    }

    const getLabel = (label: string): any => {
      if (!state.wsData.labels || state.wsData.labels.length === 0)
        return null
      let result = state.wsData.labels.find(e => e.label === label)

      return result
    }

    // 渲染图像
    const wsRender = (): void => {
      state.wsData.timer = setTimeout(() => {
        clearTimeout(state.wsData.timer)
        let item = wsOut()
        if (item) {
            let reader = new FileReader();
            reader.onload = () => {
              state.wsData.img.src = reader.result
            };
            reader.readAsBinaryString(item)
            
            //console.log('comLiveRef', comLiveRef.value)
            wsRender()
        } else {
          wsRender()
        }
      }, 20);
    }

    // 图像加载
    state.wsData.img.onload = (): void => {
      console.log('图像加载完毕...')
      comLiveRef.value.reviceBase(state.wsData.img)
      wsRender()
    }

    onMounted(() => {
      initWs()
    })

    return {
      state,
      comLiveRef,
      comDataRef
    }
  }
})
</script>