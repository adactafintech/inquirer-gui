import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Form from '../src/Form.vue';
import utils from './utils';

const questionInput = [
  {
    type: "input",
    name: "input",
    message: "An input",
    default: "default input",
    validate: function (input) {
      if (input.length >= 2) {
        return true;
      } else {
        return "Name must be at least 2 characters long";
      }
    }
  }
];

const questionPassword = [
  {
    type: "password",
    name: "password",
    message: "A password"
  }
];

const questionNumber = [
  {
    type: "number",
    name: "number",
    message: "A number",
    default: "0"
  },
];

const questionsConditional = [
  {
    type: "input",
    name: "condition",
    default: "some value"
  },
  {
    type: "input",
    name: "conditional",
    when: function (answers) {
      return (answers.condition !== "hide");
    }
  },
  {
    type: "input",
    name: "conditional2",
    when: false
  },
  {
    type: "input",
    name: "conditional3",
    when: true
  }
];

describe('Questions of type input, password and number', () => {
  test('Input', async () => {
    const value1 = "my input";

    const wrapper = mount(Form, { });
    wrapper.setProps({ questions: questionInput });
    await Vue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    // wait to account for debounce
    await utils.sleep(300);

    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].input).toEqual(value1);
    // test validation
    expect(answered[1]).toEqual(true);
  });

  test('Input with invalid input', async () => {
    const value1 = "m";

    const wrapper = mount(Form, { });
    wrapper.setProps({ questions: questionInput });
    await Vue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    // wait to account for debounce
    await utils.sleep(300);

    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].input).toEqual(value1);
    // test validation
    expect(answered[1]).toEqual(false);
  });

  test('Password', async () => {
    const value1 = "my password";

    const wrapper = mount(Form, { });
    wrapper.setProps({ questions: questionPassword });
    await Vue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    // wait to account for debounce
    await utils.sleep(300);

    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].password).toEqual(value1);
  });

  test('Number', async () => {
    const value1 = 5;

    const wrapper = mount(Form, { });
    wrapper.setProps({ questions: questionNumber });
    await Vue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    // wait to account for debounce
    await utils.sleep(300);
    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].number).toEqual(value1.toString());
  });

  test('Input with conditions', async () => {
    const wrapper = mount(Form, { });
    wrapper.setProps({ questions: questionsConditional });
    await Vue.nextTick();

    let inputs = wrapper.findAll('input');
    expect(inputs.length).toEqual(3);
    inputs.at(0).element.value = "hide";
    inputs.at(0).trigger('input');
    // wait to account for debounce
    await utils.sleep(300);

    inputs = wrapper.findAll('input');
    expect(inputs.length).toEqual(2);
  });
});