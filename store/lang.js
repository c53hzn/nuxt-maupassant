const state = () => ({
  val: "Eng"
});

const mutations = {
  toggleLang(state) {
    state.val = state.val=="Eng"?"Chi":"Eng";
  }
}

export default {
  state,
  mutations
};