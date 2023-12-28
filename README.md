# Storybook Addon Multiselect

Toolbar addon for Storybook that allows to create dropdown(s) to select single or multiple options. Also, there's user defined type of options - that allows user to toggle between select single/multiple option(s).

`onChange` callback returns an array of selected options with exposing Storybook API.

To access selected options in your stories, you need to implement your own decorator component that will access `globals.multiselect` and you can use it in your stories.

Optional Reset to default button that resets all options to default values.

![Demo multiselect image](./demo.gif)

Things to do:

- Add boolean flag to close toolbar after selection
- Measure performance and optimize

## Usage

`npm i -D storybook-addon-multiselect`

Add addon in `.storybook/main.ts`:

```ts
const config: StorybookConfig = {
  // ...
  addons: [
    // ...
    getAbsolutePath('storybook-addon-multiselect')
  ]
  // ....
}
```

Set up options in `.storybook/preview.tsx`:

```ts
// Addon is heavily typed and have jsdoc comments, so you can see all the clues in your IDE
import { Addon } from 'storybook-addon-multiselect'

// implement your own decorator component that will access `globals.multiselect` and you can use it in your stories
import YourDecoratorComponent from '../src/decorators/YourDecoratorComponent'

const multiselect: Addon = {
  // how many keys is how many dropdowns will be rendered
  theme: {
    // (optional)
    name: 'Theme',
    // put your svg or emoji (optional)
    icon: <svg />,
    // (optional)
    description: 'Change theme of Storybook (outer shell)',
    elements: [
      // reset button (optional)
      { type: 'reset' },
      // single select
      {
        type: 'singleSelect',
        // key that will be used in query string (required)
        queryKey: 'priority',
        // title of dropdown (required)
        title: 'Priority',
        // default value (optional)
        defaultValue: 'theme',
        // options (required)
        options: [
          {
            // title of option (required)
            title: 'Theme',
            // value of option (required)
            value: 'theme',
            // left side of option (optional)
            left: <svg />
          },
          {
            title: 'Language',
            value: 'lang',
            left: <svg />
          }
        ]
      }
    ]
  },
  themeAndLanguage: {
    // ...
  }
}

const preview: Preview = {
  // ...
  parameters: {
    // ...
    multiselect
  },
  globals: {
    // this is mandatory, put an empty object. Perhaps I will find a way to avoid this in future
    multiselect: {}
  },
  decorators: [
    // ...
    YourDecoratorComponent
  ]
}
```
