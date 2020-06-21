// getters.js
export default {
    evenOrOdd: state => (state.price % 2 === 0 ? 'even' : 'odd')
}
