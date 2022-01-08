const DELAY_TIME = 3000;

/**
 *
 * @returns
 */
export const methodOne = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('hola'), DELAY_TIME);
  });
};

/**
 *
 * @returns
 */
export const methodTwo = async () => {
  try {
    const response = await methodOne();
    return `${response} y chao`;
  } catch (err) {
    return '¿que paso?';
  }
};
