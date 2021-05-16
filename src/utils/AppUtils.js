const successToastMessage = (data) => {
  return { position: 'top-right', status: 'success', duration: 2000, ...data };
};

const errorToastMessage = (data) => {
  return { position: 'top-right', status: 'error', duration: 2000, ...data };
};

const exportData = {
  successToastMessage,
  errorToastMessage,
};

export default exportData;
