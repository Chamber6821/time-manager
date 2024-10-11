export type Color = 'background' | 'onBackground' | 'primary' | 'onPrimary'

export const useColors = (): Record<Color, string> => ({
  background: '#000',
  onBackground: '#fff',
  primary: '#44944a',
  onPrimary: '#000',
})
