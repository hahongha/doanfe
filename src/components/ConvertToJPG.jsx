function ConvertToJpg() {
  return (
    <>
      <></>
    </>
  );
}

export default ConvertToJpg;
const convertToJpg = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Chuyển sang JPG (chất lượng 0.9)
      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
          );
        },
        'image/jpeg',
        0.9
      );
    };
    img.onerror = (err) => reject(err);
  });
};

const handleUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const validFormats = ['image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff'];

  let processedFile = file;

  if (validFormats.includes(file.type)) {
    processedFile = await convertToJpg(file);
  }

  console.log('File sau khi chuyển đổi:', processedFile);
  // Tiếp tục upload file processedFile lên server
};

<input type="file" accept="image/*" onChange={handleUpload} />;
