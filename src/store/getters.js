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
  formatDate: () => (date) => {
    const d = new Date(date);
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
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
