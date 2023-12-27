import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import vuetify from "../../src/plugins/vuetify";
import CardComponent from "../../src/components/CardComponent.vue";

describe('CardComponent test', () => {
  it('test tasks property', () => {
    const wrapper = mount(CardComponent, {
      global: {
        plugins: [vuetify]
      },
      props: { tasks: [] }
    })
    expect(wrapper.props().tasks).toEqual([]);
  })
})
