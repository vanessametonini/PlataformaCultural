function single(strings, ...values) {
  let output = '';
  for (let i = 0; i < values.length; i += 1) output += strings[i] + values[i];
  output += strings[values.length];
  return output.split(/(?:\r\n|\n|\r)/).map((line) => line.replace(/^\s+/gm, '')).join('').trim();
}

const getters = {
  getKey(state) {
    return state.newKey;
  },
  date() {
    const date = new Date();
    return single`
      ${date.getFullYear()}/
      ${(1 + date.getMonth()).toString().padStart(2, '0')}/
      ${date.getDate().toString().padStart(2, '0')}
    `;
  },
};

export default getters;
