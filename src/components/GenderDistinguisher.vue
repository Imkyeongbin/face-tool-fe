<script setup>
import { ref } from 'vue'
// import { handleFileUpload } from '@/functions/file'

defineProps({
  msg: String,
})

const file = ref(null)
const preview = ref(null)
let result_list = ref([])
const isLoading = ref(false)

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.value = e.target.result;
  };
  if (file.value) {
    reader.readAsDataURL(file.value);
  }
}

const submitFile = async () => {
  if (!file.value) {
    alert('Please select file before uploading.')
    return
  }

  const formData = new FormData()
  formData.append('target', file.value)
  isLoading.value = true
  try {
    const response = await fetch('/api/identify-gender', {
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
      <!-- <p>{{ index + 1 }}번째 얼굴 유사도 : {{ result.map(num => Number(num.toFixed(6))) }}</p> -->
      <p>{{ index + 1 }}번째 얼굴 분석 결과(%) : {{ result['gender'] }}</p>
    </div>
  </div>

  <div class="image-box">
    <img v-if="preview" :src="preview" alt="Image preview source" />
    <input type="file" accept="image/*" @change="handleFileUpload($event)" />

  </div>
  <button @click="submitFile">성별 판별</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

img{
  display: block;
  height: 25vh;
}

.image-box{
  display: flexbox;
  flex-direction: column;
}

</style>
