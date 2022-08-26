import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from 'prism-react-renderer/themes/oceanicNext';
import styled from "@emotion/styled"

export default ({ children, className }) => {
  const language = className ? className.replace(/language-/, "") : ""
  const Line = styled.div`
    display: table-row;
  `
  const LineNo = styled.span`
    display: table-cell;
    text-align: right;
    padding-right: 1em;
    user-select: none;
    opacity: 0.5;
  `
  const LineContent = styled.span`
    display: table-cell;
  `

  return language ? (
    <Highlight {...defaultProps} code={children} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.slice(0, -1).map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </pre>
      )}
    </Highlight>
  ) : (
    <code>{children}</code>
  )
}
