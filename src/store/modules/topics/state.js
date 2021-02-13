const state = {
  list: [
    // OBJECT REFERENCE ----  TO BE DELETED
    {
      id: 1,
      title: 'Dance Fest',
      topicCategory: 1,
      categoriesTagged: 1,
      user: {
        name: 'jão', // implement user name
        id: 1,
      },
      createdAt: '2020/04/28', // implements full date, with time too mm dd yyyy HH:MM:SS timezone
      content: 'pula fogueira Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográplesmente uma simulação de texto da indústria tipográfica ede impressos,',
      positiveSupports: 170,
      negativeSupports: 65,
      numberOfReplies: 2,
      views: 0,
    },
  ],
  replies: [
    {
      id: 1,
      topicId: 1,
      user: {
        id: 2,
        name: 'Juliana Trujillo',
        categoryId: 8,
        avatar: '',
      },
      replyTag: null,
      content: 'Expedita aliquid at suscipit molestias eos dicta, sed iste quidem blanditiis quod.',
      createdAt: '2019-03-27',
      numberOfLikes: 12,
    },
    {
      id: 2,
      topicId: 1,
      user: {
        id: 27,
        name: 'Henrique Leonel',
        categoryId: 15,
        avatar: '',
      },
      replyTag: null,
      content: 'Aperiam minima autem aliquam alias consequuntur quas magnam?',
      createdAt: '2019-03-27',
      numberOfLikes: 0,
    },
    {
      id: 3,
      topicId: 3,
      user: {
        id: 2,
        name: 'Juliana Trujillo',
        categoryId: 8,
        avatar: '',
      },
      replyTag: null,
      content: 'Expedita aliquid at suscipit molestias eos dicta, sed iste quidem blanditiis quod.',
      createdAt: '2019-03-27',
      numberOfLikes: 12,
    },
    {
      id: 4,
      topicId: 3,
      user: {
        id: 27,
        name: 'Henrique Leonel',
        categoryId: 15,
        avatar: '',
      },
      replyTag: null,
      content: 'Aperiam minima autem aliquam alias consequuntur quas magnam?',
      createdAt: '2019-03-27',
      numberOfLikes: 0,
    },
    {
      id: 5,
      topicId: 3,
      user: {
        id: 2,
        name: 'Juliana Trujillo',
        categoryId: 8,
        avatar: '',
      },
      replyTag: null,
      content: 'Expedita aliquid at suscipit molestias eos dicta, sed iste quidem blanditiis quod.',
      createdAt: '2019-03-27',
      numberOfLikes: 12,
    },
    {
      id: 6,
      topicId: 3,
      user: {
        id: 43,
        name: 'fulano',
        categoryId: 15,
        avatar: '',
      },
      replyTag: 5,
      content: 'Aperiam minima autem aliquam alias consequuntur quas magnam?',
      createdAt: '2019-03-27',
      numberOfLikes: 3,
    },
  ],
  key: null,
  topicForm: {
    title: '',
    categoryId: null,
    categoriesTagged: [],
    userId: null,
    createdAt: '',
    positiveSupports: 0,
    negativeSupports: 0,
    numberOfReplies: 0,
    content: '',
    views: 0,
  },
  currentTopic: null,
  currentTopicReplies: null,
  currentFilter: null,
  streamAmount: 12, // number of topics required in request
};

export default state;
