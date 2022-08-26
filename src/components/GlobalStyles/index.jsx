// import reset from "styled-reset"
import React from "react"
import { Global, css, useTheme } from "@emotion/react"
import emotionReset from "emotion-reset"

const GlobalStyles = props => {
  const theme = useTheme()
  const globalStyle = () => css`
    ${emotionReset}
    body {
      font-family: "Noto Sans KR", sans-serif;
      background: ${theme.colors.bodyBackground};
    }
  `
  return <Global styles={globalStyle} />
}

export default GlobalStyles
