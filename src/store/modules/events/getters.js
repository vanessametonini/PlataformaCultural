import { getField } from 'vuex-map-fields';

const getters = {
  loadEvents: (state) => state.list,
  getEventForm: (state) => state.eventForm,
  getField,
  getRecents: ({ list }) => list.reverse().slice(0, 5).map((event) => {
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const data = new Date(event.dateTime);
    return {
      id: event.id,
      day: data.getDate().toString().padStart(2, '0'),
      month: monthNames[data.getMonth()],
      title: event.title,
      site: event.site,
    };
  }),
};

export default getters;
