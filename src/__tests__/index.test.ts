import * as utils from '../utils';

// definición de un SpyOn para la método "methodOne" de utils
const spyOnMethodOne = jest.spyOn(utils, 'methodOne');
const spyOnMethodTwo = jest.spyOn(utils, 'methodTwo');

describe('ejemplos de algunos test', () => {
  // Método que se ejecuta después de cada uno de los tests
  afterEach(() => {
    spyOnMethodOne.mockClear();
    spyOnMethodTwo.mockClear();
  });

  // Ejemplo de test de validación de equivalencia/
  test('1+1=2', () => {
    expect(1 + 1).toEqual(2);
  });

  // Ejemplo de test de validación de largo de un array
  test('array de largo 3', () => {
    const value = [...Array(3).keys()];
    expect(value).toHaveLength(3);
  });

  test('propiedades y valor de objecto están dentro de otro objeto', () => {
    const objOne = {
      user: 'user',
    };

    const objTwo = {
      user: 'user',
      email: 'email',
    };

    expect(objTwo).toMatchObject(objOne);
  });

  // Ejemplo de test de validación de llamada, input y output de un método
  test('método retorna valor original definido', async () => {
    const target = 'hola';
    const result = await utils.methodOne();

    expect(spyOnMethodOne).toBeCalledTimes(1);
    expect(spyOnMethodOne).toHaveBeenCalledWith();
    expect(result).toEqual(target);
  });

  // Ejemplo de test de validación de: llamada, input y output de un método, pero con la intervención de su valor original
  test('método retorna valor "mock" definido', async () => {
    const mock = 'foo';

    // definición de valor a retornar para "spyOnMethodOne"
    spyOnMethodOne.mockResolvedValueOnce(mock);

    const result = await utils.methodOne();

    expect(spyOnMethodOne).toBeCalledTimes(1);
    expect(spyOnMethodOne).toHaveBeenCalledWith();
    expect(result).toEqual(mock);
  });

  // Ejemplo de test de validación de: llamada, input y output de un método, que tiene dependencia de otro método
  test('método "methodTwo" hace su happyPath', async () => {
    const target = 'hola y chao';

    const result = await utils.methodTwo();

    expect(spyOnMethodTwo).toBeCalledTimes(1);
    expect(spyOnMethodTwo).toHaveBeenCalledWith();

    expect(spyOnMethodOne).toBeCalledTimes(1);
    expect(spyOnMethodOne).toHaveBeenCalledWith();
    expect(result).toEqual(target);
  });

  // Ejemplo de test de validación de: llamada, input y output de un método, que tiene dependencia de otro método y este resuelve con un "Reject"
  test('método "methodTwo" cae en "catch" dado que se forzó el Reject para el método "methodOne"', async () => {
    const target = '¿que paso?';

    // definición de error para "spyOnMethodOne"
    spyOnMethodOne.mockRejectedValueOnce('Error');

    const result = await utils.methodTwo();

    expect(spyOnMethodTwo).toBeCalledTimes(1);
    expect(spyOnMethodTwo).toHaveBeenCalledWith();

    expect(spyOnMethodOne).toBeCalledTimes(1);
    expect(spyOnMethodOne).toHaveBeenCalledWith();
    expect(result).toEqual(target);
  });
});

describe('demostración importación de ocupar correctamente "mockResolvedValueOnce" vs "mockResolvedValue" y "mockResolvedValue" vs "mockResolvedValueOnce"', () => {
  const mock = 'foobar';

  // TODO: Vean lo que pasa cuando se descomenta la siguiente linear
  // spyOnMethodOne.mockResolvedValue(mock); // definir un mock fuera de un test

  // Método que se ejecuta después de cada uno de los tests
  afterEach(() => {
    spyOnMethodOne.mockClear();
    spyOnMethodTwo.mockClear();
  });

  test('ejemplo 1', async () => {
    spyOnMethodOne.mockResolvedValue(mock);

    const target = mock;
    const result = await utils.methodOne();

    expect(spyOnMethodOne).toBeCalledTimes(1);
    expect(spyOnMethodOne).toHaveBeenCalledWith();
    expect(result).toEqual(target);
  });

  test('ejemplo 2', async () => {
    const target = `${mock} y chao`;

    const result = await utils.methodTwo();

    expect(spyOnMethodTwo).toBeCalledTimes(1);
    expect(spyOnMethodTwo).toHaveBeenCalledWith();

    expect(spyOnMethodOne).toBeCalledTimes(1);
    expect(spyOnMethodOne).toHaveBeenCalledWith();
    expect(result).toEqual(target);
  });
});
