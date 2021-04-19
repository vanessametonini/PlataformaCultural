const state = {
  resetPassword : {
    password: '',
    passwordConfirmation: ''
  },
  emailRecover: '',
  signUpForm: {
    firstName: '',
    lastName: '',
    email: '',
    emailConfirmation: '',
    password: '',
    confirmPassword: '',
    isValid: true,
    isAdmin: false,
    categoryId: '',
    gender: '',
    otherGender: '',
    ageRange: '',
    education: '',
    avatarId: null,
  },
  userForm: {
    ageRange:'',
    avatar:'',
    categoryId: null,
    education:'',
    email:'',
    firstName:'',
    gender:'',
    lastName:'',
    otherGender:'',
  },
  key: null,
  currentUser: {
    name: 'none',
    email: 'none@email.com',
    categoryId: 8,
  },
  isAdmin: null,
  myPin: null,
  myEvents: null,
  repliesLiked: [],
  topicsSupported: [],
};

export default state;
