import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"

import useOffsetTop from "hooks/useOffsetTop"

import Toc from "./Toc"
import StyledMarkdown from "./StyledMarkdown"
import CodeBlock from "../../CodeBlock"

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 112px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`
const components = {
  pre: props => <div className="code-block"{...props} />,
  code: CodeBlock,
}

const Body = ({ children }) => {
  const [toc, setToc] = useState([])

  const [ref, offsetTop] = useOffsetTop()

  useEffect(() => {
    setToc(
      Array.from(
        document.querySelectorAll("#article-body > h2, #article-body > h3")
      )
    )
  }, [])

  return (
    <Wrapper>
      <Toc items={toc} articleOffset={offsetTop} />
      <StyledMarkdown id="article-body" itemProp="articleBody" ref={ref}>
        <MDXProvider components={components}>{children}</MDXProvider>
      </StyledMarkdown>
    </Wrapper>
  )
}

export default Body
