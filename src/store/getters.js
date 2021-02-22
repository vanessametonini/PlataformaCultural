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
    const data = new Date(date);
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return single`
      ${data.getDate().toString().padStart(2, '0')} 
      de ${monthNames[data.getMonth()]} de 
      ${data.getFullYear()}
    `;
  },
  formatTime: () => (date) => {
    const data = new Date(date);
    const minutos = data.getMinutes();
    return single`
      ${data.getHours()} horas 
      ${(minutos === 0) ? '' : `e ${minutos} minutos`}
    `;
  },
};

export default getters;
