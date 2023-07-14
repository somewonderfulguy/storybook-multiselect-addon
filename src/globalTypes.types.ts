/** File is temporary, being in use for reference */

// MenuItem   Type      Description                                                       Required
// value      String    The string value of the menu that gets set in the globals         Yes
// title      String	  The main text of the title                                        Yes
// left       String	  A string that gets shown on the left side of the menu             No
// right      String	  A string that gets displayed on the right side of the menu        No
// icon       String	  An icon that gets shown in the toolbar if this item is selected   No

interface InputType {
  name?: string
  description?: string
  defaultValue?: any
  type?: SBType | SBScalarType['name']
  if?: Conditional
  [key: string]: any
}

type GlobalTypes = {
  [name: string]: InputType
}

/* -------------------------------------------------------------------------------------------- */

interface SBBaseType {
  required?: boolean
  raw?: string
}
type SBScalarType = SBBaseType & {
  name: 'boolean' | 'string' | 'number' | 'function' | 'symbol'
}
type SBArrayType = SBBaseType & {
  name: 'array'
  value: SBType
}
type SBObjectType = SBBaseType & {
  name: 'object'
  value: Record<string, SBType>
}
type SBEnumType = SBBaseType & {
  name: 'enum'
  value: (string | number)[]
}
type SBIntersectionType = SBBaseType & {
  name: 'intersection'
  value: SBType[]
}
type SBUnionType = SBBaseType & {
  name: 'union'
  value: SBType[]
}
type SBOtherType = SBBaseType & {
  name: 'other'
  value: string
}
type SBType =
  | SBScalarType
  | SBEnumType
  | SBArrayType
  | SBObjectType
  | SBIntersectionType
  | SBUnionType
  | SBOtherType

type ConditionalTest =
  | {
      truthy?: boolean
    }
  | {
      exists: boolean
    }
  | {
      eq: any
    }
  | {
      neq: any
    }
type ConditionalValue =
  | {
      arg: string
    }
  | {
      global: string
    }

type Conditional = ConditionalValue & ConditionalTest

const ExampleTheme = {
  textMutedColor: '#798186',
  base: 'dark',
  color: {
    primary: '#FF4785',
    secondary: '#029CFD',
    tertiary: '#FAFBFC',
    ancillary: '#22a699',
    orange: '#FC521F',
    gold: '#FFAE00',
    green: '#66BF3C',
    seafoam: '#37D5D3',
    purple: '#6F2CAC',
    ultraviolet: '#2A0481',
    lightest: '#FFFFFF',
    lighter: '#F7FAFC',
    light: '#EEF3F6',
    mediumlight: '#ECF4F9',
    medium: '#D9E8F2',
    mediumdark: '#73828C',
    dark: '#5C6870',
    darker: '#454E54',
    darkest: '#2E3438',
    border: 'hsla(203, 50%, 30%, 0.15)',
    positive: '#66BF3C',
    negative: '#FF4400',
    warning: '#E69D00',
    critical: '#FFFFFF',
    defaultText: '#C9CDCF',
    inverseText: '#222425',
    positiveText: '#448028',
    negativeText: '#D43900',
    warningText: '#A15C20'
  },
  background: {
    app: '#222425',
    bar: '#292C2E',
    content: '#1B1C1D',
    gridCellSize: 10,
    hoverable: 'rgba(2,156,253,0.07)',
    positive: '#E1FFD4',
    negative: '#FEDED2',
    warning: '#FFF5CF',
    critical: '#FF4400'
  },
  typography: {
    fonts: {
      base: '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
      mono: 'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace'
    },
    weight: {
      regular: 400,
      bold: 700
    },
    size: {
      s1: 12,
      s2: 14,
      s3: 16,
      m1: 20,
      m2: 24,
      m3: 28,
      l1: 32,
      l2: 40,
      l3: 48,
      code: 90
    }
  },
  animation: {
    rotate360: {
      name: 'animation-u07e3c',
      styles:
        '@keyframes animation-u07e3c{\n\tfrom {\n\t\ttransform: rotate(0deg);\n\t}\n\tto {\n\t\ttransform: rotate(360deg);\n\t}\n}',
      anim: 1
    },
    glow: {
      name: 'animation-r0iffl',
      styles:
        '@keyframes animation-r0iffl{\n  0%, 100% { opacity: 1; }\n  50% { opacity: .4; }\n}',
      anim: 1
    },
    float: {
      name: 'animation-6tolu8',
      styles:
        '@keyframes animation-6tolu8{\n  0% { transform: translateY(1px); }\n  25% { transform: translateY(0px); }\n  50% { transform: translateY(-3px); }\n  100% { transform: translateY(1px); }\n}',
      anim: 1
    },
    jiggle: {
      name: 'animation-ynpq7w',
      styles:
        '@keyframes animation-ynpq7w{\n  0%, 100% { transform:translate3d(0,0,0); }\n  12.5%, 62.5% { transform:translate3d(-4px,0,0); }\n  37.5%, 87.5% {  transform: translate3d(4px,0,0);  }\n}',
      anim: 1
    },
    inlineGlow: {
      name: 'e4g6ku',
      styles:
        '\n  animation: animation-r0iffl 1.5s ease-in-out infinite;\n  color: transparent;\n  cursor: progress;\n',
      next: {
        name: 'animation-r0iffl',
        styles:
          '@keyframes animation-r0iffl{\n  0%, 100% { opacity: 1; }\n  50% { opacity: .4; }\n}'
      }
    },
    hoverable: {
      name: 'wpaw6f',
      styles:
        '\n  transition: all 150ms ease-out;\n  transform: translate3d(0, 0, 0);\n\n  &:hover {\n    transform: translate3d(0, -2px, 0);\n  }\n\n  &:active {\n    transform: translate3d(0, 0, 0);\n  }\n'
    }
  },
  easing: {
    rubber: 'cubic-bezier(0.175, 0.885, 0.335, 1.05)'
  },
  input: {
    background: '#1B1C1D',
    border: 'rgba(255,255,255,.1)',
    borderRadius: 4,
    color: '#FFFFFF'
  },
  button: {
    background: '#222425',
    border: 'rgba(255,255,255,.1)'
  },
  boolean: {
    background: '#222425',
    selectedBackground: '#2E3438'
  },
  layoutMargin: 10,
  appBorderColor: 'rgba(255,255,255,.1)',
  appBorderRadius: 4,
  barTextColor: '#798186',
  barSelectedColor: '#029CFD',
  barBg: '#292C2E',
  brand: {},
  code: {
    token: {
      fontFamily:
        'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
      WebkitFontSmoothing: 'antialiased',
      '&.tag': {
        color: '#A8FF60'
      },
      '&.comment': {
        color: '#7C7C7C',
        fontStyle: 'italic'
      },
      '&.prolog': {
        color: '#7C7C7C',
        fontStyle: 'italic'
      },
      '&.doctype': {
        color: '#7C7C7C',
        fontStyle: 'italic'
      },
      '&.cdata': {
        color: '#7C7C7C',
        fontStyle: 'italic'
      },
      '&.string': {
        color: '#92C379'
      },
      '&.url': {
        color: '#C6C5FE'
      },
      '&.symbol': {
        color: '#C6C5FE'
      },
      '&.number': {
        color: '#C6C5FE'
      },
      '&.boolean': {
        color: '#C6C5FE'
      },
      '&.variable': {
        color: '#C6C5FE'
      },
      '&.constant': {
        color: '#C6C5FE'
      },
      '&.inserted': {
        color: '#C6C5FE'
      },
      '&.atrule': {
        color: '#B474DD'
      },
      '&.keyword': {
        color: '#B474DD'
      },
      '&.attr-value': {
        color: '#B474DD'
      },
      '&.punctuation': {
        color: '#EDEDED'
      },
      '&.operator': {
        color: '#EDEDED'
      },
      '&.function': {
        color: '#EDEDED'
      },
      '&.deleted': {
        color: '#9a050f'
      },
      '&.important': {
        fontWeight: 'bold'
      },
      '&.bold': {
        fontWeight: 'bold'
      },
      '&.italic': {
        fontStyle: 'italic'
      },
      '&.class-name': {
        color: '#FFFFB6'
      },
      '&.selector': {
        color: '#A8FF60'
      },
      '&.attr-name': {
        color: '#96CBFE'
      },
      '&.property': {
        color: '#96CBFE'
      },
      '&.regex': {
        color: '#96CBFE'
      },
      '&.entity': {
        color: '#96CBFE'
      },
      '&.directive.tag .tag': {
        background: '#ffff00',
        color: '#EDEDED'
      }
    },
    'language-json .token.boolean': {
      color: '#B474DD'
    },
    'language-json .token.number': {
      color: '#B474DD'
    },
    'language-json .token.property': {
      color: '#FFFFB6'
    },
    namespace: {
      opacity: 0.7
    }
  },
  addonActionsTheme: {
    BASE_FONT_FAMILY:
      'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
    BASE_FONT_SIZE: 13,
    BASE_LINE_HEIGHT: '18px',
    BASE_BACKGROUND_COLOR: 'transparent',
    BASE_COLOR: '#C9CDCF',
    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: 'rgb(227, 110, 236)',
    OBJECT_VALUE_NULL_COLOR: 'rgb(127, 127, 127)',
    OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(127, 127, 127)',
    OBJECT_VALUE_REGEXP_COLOR: 'rgb(233, 63, 59)',
    OBJECT_VALUE_STRING_COLOR: 'rgb(233, 63, 59)',
    OBJECT_VALUE_SYMBOL_COLOR: 'rgb(233, 63, 59)',
    OBJECT_VALUE_NUMBER_COLOR: 'hsl(252, 100%, 75%)',
    OBJECT_VALUE_BOOLEAN_COLOR: 'hsl(252, 100%, 75%)',
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(85, 106, 242)',
    HTML_TAG_COLOR: 'rgb(93, 176, 215)',
    HTML_TAGNAME_COLOR: 'rgb(93, 176, 215)',
    HTML_TAGNAME_TEXT_TRANSFORM: 'lowercase',
    HTML_ATTRIBUTE_NAME_COLOR: 'rgb(155, 187, 220)',
    HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(242, 151, 102)',
    HTML_COMMENT_COLOR: 'rgb(137, 137, 137)',
    HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',
    ARROW_COLOR: 'rgba(255,255,255,0.3)',
    ARROW_MARGIN_RIGHT: 4,
    ARROW_FONT_SIZE: 8,
    ARROW_ANIMATION_DURATION: '0',
    TREENODE_FONT_FAMILY:
      'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
    TREENODE_FONT_SIZE: 13,
    TREENODE_LINE_HEIGHT: '18px',
    TREENODE_PADDING_LEFT: 12,
    TABLE_BORDER_COLOR: 'rgb(85, 85, 85)',
    TABLE_TH_BACKGROUND_COLOR: 'rgb(44, 44, 44)',
    TABLE_TH_HOVER_COLOR: 'rgb(48, 48, 48)',
    TABLE_SORT_ICON_COLOR: 'black',
    TABLE_DATA_BACKGROUND_IMAGE:
      'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))',
    TABLE_DATA_BACKGROUND_SIZE: '128px 32px'
  }
}
