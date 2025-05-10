const imgToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // Base64 string
    };

    reader.onerror = (error) => {
      reject(`Error converting file: ${error}`);
    };

    reader.readAsDataURL(file);
  });
};

export { imgToBase64 };
