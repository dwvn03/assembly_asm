import { Suspense, memo, lazy } from 'react';
import { DualRing } from 'react-awesome-spinners';
import CodeData from '../../Data/CodeData';
import './Solution.css';

const TestCase = lazy(() => import('../TestCase/TestCase'));
const CodeBlock = lazy(() => import('../CodeBlock/CodeBlock'));

const Solution = ({ ques }) => {
    const currSolution = CodeData[ques];

    return (
        <div className="Solution">
            <h3>Solution 1 : C</h3>
            <Suspense fallback={<DualRing />}>
                <CodeBlock lang="c" solution={ currSolution.c } />
            </Suspense>

            <h3>Solution 2 : Assembly</h3>
            <Suspense fallback={<DualRing />}>
                <CodeBlock lang="x86asm" solution={ currSolution.x86asm } />
            </Suspense>

            <h3>Test Case</h3>
            <Suspense fallback={<DualRing />}>
                <TestCase testCaseImgs={ currSolution.testCaseImgs } />
            </Suspense>
        </div>
    )
}

export default memo(Solution)