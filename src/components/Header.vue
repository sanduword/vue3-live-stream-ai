<template>
  <div class="header">
    <div class="t-dynamic">
      <h2>{{ title }}</h2>
      <div class="h-d-tips"></div>
    </div>
    
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Header',
  data(){
    return {
      title:'实时流视频在线识别-YoloV4通用模型'
    }
  }
})
</script>