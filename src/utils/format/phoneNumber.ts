export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length === 9) {
    return phoneNumber.replace(/^(\d{2})(\d{3})(\d{4})$/, "$1-$2-$3");
  }

  if (phoneNumber.length === 10) {
    return phoneNumber.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
  }

  if (phoneNumber.length === 11) {
    return phoneNumber.replace(/^(\d{2,3})(\d{4})(\d{4})$/, "$1-$2-$3");
  }

  return phoneNumber;
};
