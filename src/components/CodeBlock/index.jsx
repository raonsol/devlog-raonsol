import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";
import styled from "@emotion/styled";

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, "") : "";
  const Line = styled.div`
    display: table-row;
    font-size: 0.9rem;
  `;
  const LineNo = styled.span`
    display: table-cell;
    text-align: right;
    padding-right: 1em;
    user-select: none;
    opacity: 0.5;
  `;
  const LineContent = styled.span`
    display: table-cell;
  `;
  const Inline = styled.code`
    padding: 0.25rem;
    background-color: ${(props) => props.theme.colors.inlineCodeBackground};
    color: ${(props) => props.theme.colors.text};
    border-radius: 5px;
    font-size: 0.9rem;
    font-family: source code pro;
    line-height: 1.1rem;
    display: inline-block;
  `;

  return language ? (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
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
    <Inline>{children}</Inline>
  );
};

CodeBlock.displayName = "CodeBlock";

export default CodeBlock;
