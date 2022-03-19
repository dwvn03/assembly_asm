import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import x86asm from 'react-syntax-highlighter/dist/esm/languages/hljs/x86asm';
import aod from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import './CodeBlock.css';

SyntaxHighlighter.registerLanguage('x86asm', x86asm);
SyntaxHighlighter.registerLanguage('c', c);

const Codeblock = ({ lang, solution }) => (
    <SyntaxHighlighter className="CodeBlock" language={ lang } style={ aod }>
        { solution }
    </SyntaxHighlighter>
);

export default Codeblock;