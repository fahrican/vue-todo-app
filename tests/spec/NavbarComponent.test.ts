import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import NavbarComponent from "../../src/components/NavbarComponent.vue";
import vuetify from "../../src/plugins/vuetify";

describe('test navbar', () => {
  it('get emits', () => {
    const wrapper = mount(NavbarComponent, {
      global: {
        plugins: [vuetify]
      },
    })
    expect(typeof NavbarComponent.logoClicked).toBe("function");
  })
})
