import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import {createApp, h} from 'vue'
import NavbarComponent from "../../src/components/NavbarComponent.vue";
import vuetify from "../../src/plugins/vuetify";

describe('test navbar', () => {
  it('get emits', () => {
    const app = createApp({
      render: () => h(NavbarComponent)
    })
    app.use(vuetify)
    const wrapper = mount(app.component('navbar-component'), {
      global: {
        plugins: [vuetify]
      },
    })
    expect(typeof NavbarComponent.logoClicked).toBe("function");
  })
})
