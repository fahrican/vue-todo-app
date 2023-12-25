import {describe, it, expect, test} from 'vitest'
import { mount } from '@vue/test-utils'
import '../utils/setupVuetify';
import NavbarComponent from "../../src/components/NavbarComponent.vue";

describe('NavbarComponent', () => {
  it('renders the component', () => {
    // Mount the component
    const wrapper = mount(NavbarComponent);

    // Check if the logo image is rendered
    const logo = wrapper.find('img');
    expect(logo.exists()).toBe(true);

    // Check if the button for creating a task is rendered
    const createTaskButton = wrapper.find('button:contains("Create Task")');
    expect(createTaskButton.exists()).toBe(true);
  });

  // Add more tests as needed
});
