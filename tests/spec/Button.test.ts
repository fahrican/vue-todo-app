import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from "@/components/Button.vue";
import vuetify from "@/plugins/vuetify";

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      global: {
        plugins: [vuetify]
      },
      props: { label: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })
})
