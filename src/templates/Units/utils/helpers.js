export const calculatePercentOfChecked = (validate) => {
  return 100 * validate.reduce((s, v) =>
    v.checked ? s + 1 : s
    , 0) / validate.length
}