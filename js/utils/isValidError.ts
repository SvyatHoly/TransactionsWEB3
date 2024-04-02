export const isValidError = (error: any): error is Error => {
  return typeof error === 'object' && 'message' in error;
};
