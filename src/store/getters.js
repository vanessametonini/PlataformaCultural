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
  formatDate(state) {
    const d = new Date(state.topics.currentTopic.createdAt);
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Junho', 'Julho', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    let day;
    if (d.getDate().toString().length === 1) {
      day = `0${d.getDate()}`;
    } else {
      day = d.getDate();
    }
    return `${day} de ${month} de ${year}`;
  },
};

export default getters;
