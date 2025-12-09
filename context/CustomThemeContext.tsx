import {
  customDarkTheme,
  customLightTheme,
  CustomTheme,
} from '@/constants/theme'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useColorScheme } from 'react-native'

type TThemeContext = {
  theme?: 'light' | 'dark'
  themeObject?: CustomTheme
  toggle?: () => void
}

const defaultContextValue: TThemeContext = {
  theme: 'light',
}

export const CustomThemeContext =
  createContext<TThemeContext>(defaultContextValue)

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme()

  const [theme, setTheme] = useState<'light' | 'dark'>(
    systemColorScheme ?? 'light'
  )

  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme)
    }
  }, [systemColorScheme])

  const themeObject =
    systemColorScheme === 'light' ? customLightTheme : customDarkTheme

  return (
    <CustomThemeContext.Provider value={{ theme, themeObject }}>
      {children}
    </CustomThemeContext.Provider>
  )
}
export const useCustomTheme = () => useContext(CustomThemeContext)
