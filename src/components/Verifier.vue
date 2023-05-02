<script setup>
import { ref } from 'vue'
import { handleFilePairUpload } from '@/functions/file'
let props = defineProps({
  msg: String,
})

const files = ref([null, null])
const previews = ref([null, null])
let result_list = ref([])
const isLoading = ref(false)


const submitFiles = async () => {
  if (!files.value[0] || !files.value[1]) {
    alert('Please select both files before uploading.')
    return
  }

  const formData = new FormData()
  formData.append('origin', files.value[0])
  formData.append('target', files.value[1])
  isLoading.value = true
  try {
    const response = await fetch('/api/verify-faces', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      // alert('Files uploaded successfully.')
      let data = await response.json()
      if (data['result_list']){
        result_list.value = data['result_list']
      }
      alert(data['result_message'])
    } else {
      alert('Failed to upload files.')
    }
  } catch (error) {
    console.error('Error uploading files:', error)
  } finally{
    isLoading.value = false
  }
}

</script>

<template>
  
  <h1>{{ msg }}</h1>
  <div v-if="isLoading">이미지 크기와 네트워크 환경에 따라 5~10초 정도 걸릴 수 있습니다.</div>
  <div class="card" :class="{ 'loading': isLoading }">
    <div v-if="isLoading" class="spinner"></div>
    <div v-for="(result, index) in result_list" :key="index">
      <p>{{ index + 1 }}번째 얼굴 유사도(%) : {{ result.map(num => Number(num.toFixed(6))* 100 ) }}</p>
    </div>
  </div>
  <div class="flex">
    <div>
      <img v-if="previews[0]" :src="previews[0]" alt="Image preview source" />
      <input type="file" accept="image/*" @change="handleFilePairUpload(files, previews, 0, $event)" />
    </div>
    <div>
      <img v-if="previews[1]" :src="previews[1]" alt="Image preview target" />
      <input type="file" accept="image/*" @change="handleFilePairUpload(files, previews, 1, $event)" />
    </div>
    
    <button @click="submitFiles">이미지 비교</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

img{
  display: block;
  height: 25vh;
}


</style>
