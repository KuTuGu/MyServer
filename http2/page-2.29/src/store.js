export default {
  state: {
    content: '',
    canEdit: false,
  },
  mutations: {
    updateContent(state, payload){
      state.content = payload;
    },
    updateCanEdit(state, payload){
      state.canEdit = payload;
    },
  }
};