// functions/file.js
const handleFilePairUpload = (files, previews, index, event) => {
  files[index] = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    previews[index] = e.target.result
  }
  if (files[index]) {
    reader.readAsDataURL(files[index])
  }
}

// const handleFileUpload = (fileRef, previewRef, event) => {
//   const file = event.target.files[0];
//   fileRef.value = file;
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     previewRef.value = e.target.result;
//   };
//   if (file) {
//     reader.readAsDataURL(file);
//   }
// }

export { handleFilePairUpload }
