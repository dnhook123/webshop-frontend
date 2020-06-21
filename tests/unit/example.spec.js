import {createLocalVue, shallowMount} from '@vue/test-utils'
import Cart from '@/components/Cart'
import Vuex from 'vuex'
import storeConfig from './store-config'
import { cloneDeep } from 'lodash'


const localVue = createLocalVue()

localVue.use(Vuex)

describe('Cart.vue', () => {

  let wrapper;
  let store;


  beforeEach(() => {
    store = new Vuex.Store({
    })
    wrapper = shallowMount(Cart, {store, localVue

    })

  })


  it("check for H5 in component", ()=> {

  expect(wrapper.find("h5").text()).toBe("My Bag")
  })

  it("check for button by id in component", ()=> {

    expect(wrapper.find("#test123").text()).toBe("Doorgaan met winkelen")
  })

  test('test vuex increment price', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.price).toBe(0)
    store.commit('increment')
    expect(store.state.price).toBe(1)
  })

  test('updates vuex increment price status', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.getters.evenOrOdd).toBe('even')
    store.commit('increment')
    expect(store.getters.evenOrOdd).toBe('odd')
  })


})
