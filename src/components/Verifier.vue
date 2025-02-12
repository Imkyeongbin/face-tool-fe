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
  <div class="app-container">
    <h1 class="title">{{ msg }}</h1>
    <div v-if="isLoading" class="loading-message">
      이미지 크기와 네트워크 환경에 따라 5~10초 정도 걸릴 수 있습니다.
    </div>
    <div class="results-container" v-if="result_list.length > 0">
      <div v-for="(result, index) in result_list" :key="index" class="result-item">
        <p>{{ index + 1 }}번째 얼굴 유사도(%) : {{ result.map(num => (num * 100).toFixed(2)) }}</p>
      </div>
    </div>
    <div class="image-upload-container">
      <div class="image-box" v-for="(preview, index) in previews" :key="index">
        <img v-if="preview" :src="preview" :alt="`Image preview ${index + 1}`" class="image-preview"/>
        <input type="file" accept="image/*" @change="handleFilePairUpload(files, previews, index, $event)" class="file-input"/>
      </div>
    </div>
    <button class="submit-button" @click="submitFiles">이미지 비교</button>
  </div>
</template>


<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.title {
  color: #333;
  margin-bottom: 20px;
}

.loading-message {
  color: #888;
  font-size: 14px;
}

.results-container {
  margin-top: 20px;
}

.result-item {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.image-upload-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
}

.image-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-preview {
  max-height: 200px;
  margin-bottom: 10px;
}

.file-input {
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  border: 2px solid #ccc;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:active {
  background-color: #397239;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
