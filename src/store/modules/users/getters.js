const getters = {
  isLoggedIn(state) {
    const token = localStorage.getItem('access_token');
    return (state.currentUser !== null) && (token !== null);
    // return (token !== null);
  },
  isAdmin(state) {
    return (state.isAdmin !== null);
  },
  getCurrentUser: (state) => state.currentUser,
  getMyPin: (state) => state.myPin,
  getMyPinState: (state) => state.myPin !== null,
  getMyEvents: (state) => state.myEvents,
  getMyLikes: (state) => state.repliesLiked,
  getMyVotes: (state) => state.topicsSupported,
  getUserReference(state) {
    const userRef = {
      id: state.currentUser.user.id,
      name: state.currentUser.user.firstName,
      categoryId: state.currentUser.user.categoryId,
      avatar: '',
    };
    return userRef;
  },
};

export default getters;
