export default {
  namespaced: true,
  state: {
    pins: [
      {
        id: 1,
        userId: 0, // nao mostra no mapa, mas se user for dono então pode editar no seu perfil
        categoryId: 17, // para recuperar cor de modules/categories
        title: 'Brava',
        email: 'brava@email.com',
        address: {
          phone: '(67) 3253-3795',
          street: 'Av Calógeras',
          neighborhood: 'Centro',
          number: '3100',
          city: 'Campo Crande',
          zipcode: '79004381',
        },
        createdAt: '2019-03-27',
        coordinates: [-20.453422, -54.620065],
        description: 'Muito mais que um bar, um Bar',
        linkF: 'https://www.facebook.com/brava3100',
        linkIG: 'https://www.instagram.com/brava3100/',
        otherLink: 'https://www.instagram.com/brava3100/',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuD1wHotql9_3l0Md18AZBHazV0gWFHzlv7itpkZ6oB1cnLNtc&usqp=CAU',
      },
      {
        id: 2,
        userId: 0,
        categoryId: 14,
        title: 'Casa Colonial',
        email: 'casacolonial@email.com',
        phone: '(67) 3383-3207',
        address: {
          street: 'Av. Afonso Pena',
          neighborhood: 'Centro',
          number: '3997',
          city: 'Campo Grande',
          zipcode: '79020-000',
        },
        createdAt: '2019-03-27',
        coordinates: [-20.460178, -54.598564],
        description: 'á la carte fino com destaque ao galeto, costelinha e talharim, com arquitetura e decoração de estilo colonial',
        linkF: 'https://www.facebook.com/CasaColonialCG',
        linkIG: 'https://www.instagram.com/casacolonialcg/',
        otherLink: 'https://www.instagram.com/casacolonialcg/',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuD1wHotql9_3l0Md18AZBHazV0gWFHzlv7itpkZ6oB1cnLNtc&usqp=CAU',
      },
      {
        id: 3,
        userId: 0,
        categoryId: 12,
        title: 'DAZA',
        email: 'daza@email.com',
        phone: '(67) 99242-7070',
        address: {
          street: 'R. Mal. Rondon',
          neighborhood: 'Centro',
          number: '2181',
          city: 'Campo Grande',
          zipcode: '79002-205',
        },
        createdAt: '2019-03-27',
        coordinates: [-20.458708, -54.610769],
        description: 'Festa e músicas variadas, incluindo pop, rock, e indie, além de coqueteis, casa noturna lgbt animada',
        linkF: 'https://www.facebook.com/Daza-464227847033034',
        linkIG: 'https://www.instagram.com/dazaclub/',
        otherLink: 'https://www.instagram.com/dazaclub/',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuD1wHotql9_3l0Md18AZBHazV0gWFHzlv7itpkZ6oB1cnLNtc&usqp=CAU',
      },
      {
        id: 4,
        userId: 0,
        categoryId: 8,
        title: 'Studio Fraulob',
        email: 'fraulob@email.com',
        phone: '(67) 6576-7688',
        address: {
          street: 'R. Pedro Celestino',
          neighborhood: 'Centro',
          number: '2130',
          city: 'Campo Grande',
          zipcode: '79002-372',
        },
        createdAt: '2019-03-27',
        coordinates: [-20.454078, -54.613254],
        description: 'Fotas incriveis e fofinhas',
        linkF: 'https://www.facebook.com/elianefraulob',
        linkIG: 'https://www.instagram.com/elianefraulob/',
        otherLink: 'https://www.instagram.com/elianefraulob/',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuD1wHotql9_3l0Md18AZBHazV0gWFHzlv7itpkZ6oB1cnLNtc&usqp=CAU',
      },
      {
        id: 5,
        userId: 0,
        categoryId: 17,
        title: 'Morada do Baís',
        email: 'morada@email.com',
        phone: '(67) 7867-6788',
        address: {
          street: 'Av. Noroeste',
          neighborhood: 'Centro',
          number: '5140',
          city: 'Campo Grande',
          zipcode: '79051-485',
        },
        createdAt: '2019-03-27',
        coordinates: [-20.464255, -54.620107],
        description: 'Programação variada de eventos culturais, incluindo música, arte, cinema e gastronomia, em prédio histórico.',
        linkF: 'https://www.facebook.com/elianefraulob',
        linkIG: 'https://www.instagram.com/elianefraulob/',
        otherLink: 'https://www.instagram.com/elianefraulob/',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuD1wHotql9_3l0Md18AZBHazV0gWFHzlv7itpkZ6oB1cnLNtc&usqp=CAU',
      },
      {
        id: 6,
        userId: 0,
        categoryId: 9,
        title: 'Leitura',
        email: 'leitura@email.com',
        phone: '(67) 7867-6788',
        address: {
          street: 'Av. Mato Grosso',
          neighborhood: 'Santa Fé',
          number: '3059',
          city: 'Campo Grande',
          zipcode: '79021-002',
        },
        createdAt: '2019-03-27',
        coordinates: [-20.450967, -54.591188],
        description: 'Leia conosco',
        linkF: 'https://www.facebook.com/elianefraulob',
        linkIG: 'https://www.instagram.com/elianefraulob/',
        otherLink: 'https://www.instagram.com/elianefraulob/',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuD1wHotql9_3l0Md18AZBHazV0gWFHzlv7itpkZ6oB1cnLNtc&usqp=CAU',
      },
    ],
  },

  getters: {
    loadPins(state) {
      return state.pins;
    },

    getPinById({ state }, id) {
      const index = state.pins.findIndex((item) => item.id === id);
      return state.pins[index];
    },
  },

  actions: {
    loadPins(state, { commit }) {
      commit('SET_PINS_LIST', state.list);
    },
  },

  mutatios: {
    SET_PINS_LIST({ pins }) {
      this.state.list = pins;
    },

    // ADD_NEW_PIN({ state }, { data }) {
    //   return 'add pin mutation';
    // },

    // DELETE_PIN_BY_ID({ state }, { id }) {
    //   return 'delete pin by id';
    // },

    // UPDATE_PIN_BY_ID({state}, { id, newData }) {
    //   return 'update pin by id';
    // },
  },
};
