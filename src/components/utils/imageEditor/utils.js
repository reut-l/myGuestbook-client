export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const replaceBtns = (editorRef) => {
  const rootElement = editorRef.current.getRootElement();
  const downloadBtn = rootElement.querySelector(
    '.tui-image-editor-download-btn'
  );
  const saveBtn = document.createElement('BUTTON');
  saveBtn.innerHTML = 'Save';
  saveBtn.classList.add('tui-image-editor-save-btn');
  downloadBtn.replaceWith(saveBtn);
};
