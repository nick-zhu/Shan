const numberMap = {
  '[object Boolean]': 2,
  '[object Number]': 3,
  '[object String]': 4,
  '[object Function]': 5,
  '[object Symbol]': 6,
  '[object Array]': 7
};

const __type = Object.prototype.toString;

export function typeNum(data) {
  if (data === undefined) {
    return 0;
  }
  if(data === null) {
    return 1;
  }

  let a = numberMap[__type.call(data)];
  return a || 8;
}