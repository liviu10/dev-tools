
import React, { useState, useEffect, useRef } from 'react';
import NumberedTextarea from './NumberedTextarea';
import ToolLayout from './ui/ToolLayout';
import ToolActionButtons from './ui/ToolActionButtons';
import StatusBanner from './ui/StatusBanner';
import * as acorn from 'acorn';

interface LogEntry {
    type: 'success' | 'error' | 'log';
    message: string;
    name?: string;
    location: string | null;
    timestamp: string;
}

// Optimization: Moved worker script and pure functions outside the component
// to prevent them from being redeclared on every render.
const workerScript = `
    self.onmessage = (event) => {
        const code = event.data;
        if (!code) return;

        const originalConsoleLog = self.console.log;
        self.console.log = (...args) => {
            const formattedArgs = args.map(arg => {
                try {
                    if (arg === undefined) return 'undefined';
                    if (typeof arg === 'object' && arg !== null) {
                        return JSON.stringify(arg, null, 2);
                    }
                    return String(arg);
                } catch(e) {
                    return '[Unserializable Object]';
                }
            });
            self.postMessage({ type: 'log', data: formattedArgs.join(' ') });
        };

        try {
            (new Function(code))();
            self.postMessage({ type: 'success', data: 'Script finished successfully.' });
        } catch (e) {
            self.postMessage({ type: 'error', data: { message: e.message, name: e.name, stack: e.stack }});
        } finally {
            self.console.log = originalConsoleLog;
        }
    };
`;

const parseErrorStack = (stack?: string): string | null => {
    if (!stack) return null;
    const match = stack.match(/<anonymous>:(\d+):(\d+)/);
    if (match && match[1] && match[2]) {
        return `Line: ${match[1]}, Column: ${match[2]}`;
    }
    return null;
};


const JsValidator: React.FC = () => {
    const [inputJs, setInputJs] = useState('');
    const [results, setResults] = useState<LogEntry[]>([]);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        const blob = new Blob([workerScript], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        workerRef.current = new Worker(workerUrl);

        workerRef.current.onmessage = (event: MessageEvent<any>) => {
            const { type, data } = event.data;
            let newEntry: LogEntry;
            const timestamp = new Date().toLocaleTimeString();

            switch (type) {
                case 'log':
                    newEntry = {
                        type: 'log',
                        message: data,
                        name: 'console.log',
                        location: null,
                        timestamp,
                    };
                    break;
                case 'success':
                    newEntry = {
                        type: 'success',
                        message: data,
                        name: 'Success',
                        location: null,
                        timestamp,
                    };
                    break;
                case 'error':
                    newEntry = {
                        type: 'error',
                        message: data.message,
                        name: data.name || 'Error',
                        location: parseErrorStack(data.stack),
                        timestamp,
                    };
                    break;
                default:
                    return;
            }
            setResults(prevResults => [newEntry, ...prevResults]);
        };

        workerRef.current.onerror = (event) => {
            const newResult: LogEntry = {
                type: 'error',
                message: `A worker error occurred: ${event.message}`,
                name: 'WorkerError',
                location: null,
                timestamp: new Date().toLocaleTimeString(),
            };
             setResults(prevResults => [newResult, ...prevResults]);
        };

        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                URL.revokeObjectURL(workerUrl);
            }
        };
    }, []);

    const handleValidate = () => {
        if (inputJs.trim() === '') {
            const newResult: LogEntry = {
                type: 'error',
                message: 'Input is empty. Please provide a JavaScript string.',
                name: 'Input Error',
                location: null,
                timestamp: new Date().toLocaleTimeString(),
            };
            setResults(prevResults => [newResult, ...prevResults]);
            return;
        }

        try {
            acorn.parse(inputJs, { ecmaVersion: 'latest' });
        } catch (e: any) {
            if (e.loc) {
                const newResult: LogEntry = {
                    type: 'error',
                    message: e.message.replace(/ \(\d+:\d+\)$/, ''),
                    name: 'SyntaxError',
                    location: `Line: ${e.loc.line}, Column: ${e.loc.column + 1}`,
                    timestamp: new Date().toLocaleTimeString(),
                };
                setResults(prevResults => [newResult, ...prevResults]);
            }
            return;
        }

        if (workerRef.current) {
            workerRef.current.postMessage(inputJs);
        }
    };

    const handleClear = () => {
        setInputJs('');
        setResults([]);
    };

    const getBorderColor = () => {
        if (results.length === 0) return 'border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500';
        const lastResult = results[0];
        if (lastResult.type === 'error') return 'border-red-500 focus-within:ring-red-500';
        if (lastResult.type === 'success') return 'border-green-500 focus-within:ring-green-500';
        return 'border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500';
    };

    return (
        <ToolLayout title="JavaScript Sandbox">
            <label htmlFor="input-js" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JavaScript Code</label>
            <div className="w-full h-80">
                <NumberedTextarea
                    id="input-js"
                    value={inputJs}
                    onChange={(e) => setInputJs(e.target.value)}
                    placeholder={'// Use console.log() to see output\nconsole.log("Hello, World!");'}
                    containerClassName={getBorderColor()}
                    aria-label="JavaScript Code"
                />
            </div>
            
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Evaluation Output</h3>
                <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg max-h-60 overflow-y-auto">
                    {results.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            Evaluation output will appear here.
                        </div>
                    ) : (
                        results.map((res, index) => (
                            <div key={index} className={`p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 flex items-start space-x-3`}>
                                {res.type === 'success' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                {res.type === 'error' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                 {res.type === 'log' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                                <div className="flex-1 text-sm">
                                    <div className="flex justify-between items-baseline">
                                        <p className={`font-bold ${
                                            res.type === 'success' ? 'text-green-500 dark:text-green-400' :
                                            res.type === 'error' ? 'text-red-500 dark:text-red-400' :
                                            'text-gray-700 dark:text-gray-300'
                                        }`}>
                                            {res.name}
                                        </p>
                                        <span className="text-xs text-gray-500">{res.timestamp}</span>
                                    </div>
                                    <p className={`whitespace-pre-wrap break-words ${
                                        res.type === 'log' ? 'text-blue-500 dark:text-blue-300 font-mono' : 'text-gray-800 dark:text-gray-200'
                                    }`}>{res.message}</p>
                                    {res.location && (
                                        <p className="text-gray-500 dark:text-gray-400 font-mono text-xs mt-1">{res.location}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ToolActionButtons
                onPrimaryAction={handleValidate}
                primaryActionText="Run & Validate"
                onClear={handleClear}
            />
        </ToolLayout>
    );
};

export default JsValidator;
