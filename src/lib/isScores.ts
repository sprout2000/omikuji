const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
type ArrayCheckOption = 'all' | 'first';
const isArray =
  <T>(
    childCheckFn:
      | ((value: unknown) => value is T)
      | ((value: unknown) => boolean),
    checkOption: ArrayCheckOption = 'all'
  ) =>
  (array: unknown): boolean =>
    Array.isArray(array) &&
    (checkOption === 'all'
      ? ((array) => {
          for (const val of array) {
            if (!childCheckFn(val)) return false;
          }
          return true;
        })(array)
      : typeof array[0] === 'undefined' || childCheckFn(array[0]));
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isScores = (
  arg_0: unknown,
  checkOpt: ArrayCheckOption = 'all'
): arg_0 is Score[] =>
  isArray(
    (arg_1: unknown): boolean =>
      isObject(arg_1) &&
      'createdAt' in arg_1 &&
      isString(arg_1['createdAt']) &&
      'fortune' in arg_1 &&
      isString(arg_1['fortune']) &&
      'id' in arg_1 &&
      isNumber(arg_1['id']) &&
      'oracle' in arg_1 &&
      isString(arg_1['oracle']),
    checkOpt
  )(arg_0);
