<template>
  <div class="live-ai">
    <div class="la-box">
      <div class="la-cavas">
        <div class="not nor-cols" v-show="state.not">正在加载中...</div>
        <canvas ref="comStream" width="640" height="480"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'LiveAi',
  props: {
    
  },
  setup(props, content) {
    const state = reactive({
      context: null,
      not: true
    })

    const comStream = ref<null>(null)

    //console.log('props', props.img_base)
    //let imgBase = ref(null)
    const reviceBase = (imgBase: object): void => {
      renderImg(imgBase)
    }

    const renderImg = (imgBase: object): void => {
      if (!state.context || !imgBase) {
        console.error('canvas的context或者imgBase为空')
        return
      }
      state.not = false
      state.context.clearRect(0, 0, comStream.value.width, comStream.value.height)
      state.context.drawImage(imgBase, 0, 0, comStream.value.width, comStream.value.height)
    }

    onMounted(() => {
      state.context = comStream.value.getContext('2d')
    })

    return {
      state,
      comStream,
      reviceBase
    }
  }
})
</script>