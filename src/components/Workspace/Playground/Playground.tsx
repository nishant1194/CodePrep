import React, { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import axios from "axios";
 
type Props = {};

const Playground = ({ problem }) => {
  const languageMap = {
  javascript: "nodejs",
  python: "python3",
  cpp: "cpp17",
  java: "java",
};

  const headerCode = {
    java: `import java.util.*;`,
    cpp: `#include <bits/stdc++.h>
          using namespace std;`,
    python: "",
    javascript: "",
  };
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [userCode, setUserCode] = useState(
    (problem.languages[selectedLanguage]?.starterCode || "") + "\n".repeat(7)
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const adjustErrorLineNumbers = (apiError, hiddenLines) => {
    const lineErrorRegex = /line (\d+)/g;
    let match;
    let adjustedError = apiError;

    while ((match = lineErrorRegex.exec(apiError)) !== null) {
      const originalLineNumber = parseInt(match[1], 10);
      const adjustedLineNumber = originalLineNumber - hiddenLines;
      adjustedError = adjustedError.replace(
        `line ${originalLineNumber}`,
        `line ${adjustedLineNumber}`
      );
    }

    return adjustedError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOutput("");
    const testCasesCount = problem.testCases.length;
    const driverCode = problem.languages[
      selectedLanguage
    ].handlerFunction.replace(/{{TEST_CASES_COUNT}}/g, testCasesCount);
    const fullCode =
      headerCode[selectedLanguage] + userCode + "\n" + driverCode;
    const hiddenCodeLinesCount = driverCode.split("\n").length;
    console.log(fullCode);

    let stdinIP = "";
    for (const tc of problem?.testCases) {
      stdinIP += tc.stdin + "\n";
    }
    console.log(stdinIP);

    try {
      const response = await axios.post("/api/execute", {
        code: fullCode,
        language: languageMap[selectedLanguage] || selectedLanguage,
        stdin: stdinIP,
      });
      if (response.data.output) {
        setOutput(response.data.output);
        setError("");
      }
    } catch (err) {
      const apiError = err.response?.data?.error || err.message;
      const adjustedError = adjustErrorLineNumbers(
        apiError,
        hiddenCodeLinesCount
      );
      setError(adjustedError);
    }
  };

  useEffect(() => {
    setUserCode(
      (problem.languages[selectedLanguage]?.starterCode || "") + "\n".repeat(7)
    );
  }, [selectedLanguage, problem.languages]);

  const onChange = (value: string) => {
    setUserCode(value);
  };

  return (
    <div className="flex flex-col bg-[rgb(40,40,40)] relative overflow-x-hidden h-[95vh]">
      <PreferenceNav
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <div className="w-full h-[300px] overflow-auto">
        <CodeMirror
          value={userCode}
          theme={vscodeDark}
          onChange={onChange}
          extensions={[javascript()]}
        />
      </div>

      <div className="w-full overflow-auto">
        <div className="bg-[rgb(26,26,26)] h-2"></div>
        {(output || error) && (
          <div className="w-full px-5 py-4 overflow-auto">
            <div className="flex h-8 items-center space-x-6">
              <div className="relative flex h-full flex-col justify-center cursor-pointer">
                <div className="text-sm font-medium leading-5 text-white">
                  Submission Report
                </div>
                <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
              </div>
            </div>

            <div className="font-semibold flex flex-col ">
              {output && (
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-[hsla(0,0%,100%,.1)] border-transparent text-white mt-2">
                  {output}
                </div>
              )}
              {error && (
<div
  className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-[hsla(0,0%,100%,.1)] border-transparent text-white mt-2"
  dangerouslySetInnerHTML={{ __html: error }}
></div>

              )}
            </div>
          </div>
        )}

        <div className="w-full px-5 overflow-auto">
          <div className="flex h-8 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 "
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-[hsla(0,0%,100%,.1)] hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold flex flex-col ">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-[hsla(0,0%,100%,.1)] border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] mb-12 bg-[hsla(0,0%,100%,.1)] border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </div>

      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};
export default Playground;
