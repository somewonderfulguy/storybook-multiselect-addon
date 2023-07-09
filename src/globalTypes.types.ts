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
