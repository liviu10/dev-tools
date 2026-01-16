import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { COMMAND_DATA } from '../data/linuxCommands';
import { FILESYSTEM_DATA } from '../data/linuxFilesystem';

type Tab = 'command' | 'permissions' | 'filesystem';

// --- Command Explainer Component ---
interface CommandPart {
    part: string;
    explanation: string;
}

const CommandExplainer: React.FC = () => {
    const [command, setCommand] = useState('ls -la');
    const [explanation, setExplanation] = useState<CommandPart[] | null>(null);
    const [hoveredPartIndex, setHoveredPartIndex] = useState<number | null>(null);
    
    const parseCommand = useCallback((input: string) => {
        if (!input.trim()) {
            setExplanation(null);
            return;
        }

        const parseSingleCommand = (tokens: string[]): CommandPart[] => {
            if (tokens.length === 0) return [];
            
            const explanationParts: CommandPart[] = [];
            const cmd = tokens[0];
            
            if (cmd === 'sudo') {
                const sudoInfo = COMMAND_DATA['sudo'];
                explanationParts.push({ part: 'sudo', explanation: sudoInfo.description });
                const subCommandTokens = tokens.slice(1);
                const subCommandExplanation = parseSingleCommand(subCommandTokens);
                if (subCommandExplanation.length > 0) {
                     subCommandExplanation[0].explanation += ' (executed with superuser privileges via sudo)';
                }
                return [...explanationParts, ...subCommandExplanation];
            }

            const commandInfo = COMMAND_DATA[cmd];
            if (commandInfo) {
                explanationParts.push({ part: cmd, explanation: commandInfo.description });
                const allFollowingTokens = tokens.slice(1).map(token => token.replace(/^["']|["']$/g, ''));
                if (commandInfo.customParsing && commandInfo.handleArguments) {
                    const argExplanations = commandInfo.handleArguments(allFollowingTokens);
                    explanationParts.push(...argExplanations);
                } else {
                    const args: string[] = [];
                    const options: string[] = [];
                    allFollowingTokens.forEach(token => {
                        if (token.startsWith('-')) options.push(token);
                        else args.push(token);
                    });
                    options.forEach(opt => {
                        if (commandInfo.options[opt]) {
                            explanationParts.push({ part: opt, explanation: commandInfo.options[opt].description });
                        } else {
                            if (opt.startsWith('-') && !opt.startsWith('--') && opt.length > 2) {
                                const flags = opt.substring(1).split('').sort().join('');
                                const sortedOpt = `-${flags}`;
                                if (commandInfo.options[sortedOpt]) {
                                    explanationParts.push({ part: opt, explanation: commandInfo.options[sortedOpt].description });
                                    return;
                                }
                            }
                            explanationParts.push({ part: opt, explanation: `Unknown option for '${cmd}'.` });
                        }
                    });
                    if (commandInfo.handleArguments) {
                        const argExplanations = commandInfo.handleArguments(args);
                        explanationParts.push(...argExplanations);
                    } else if (args.length > 0) {
                        args.forEach(arg => explanationParts.push({ part: arg, explanation: `Argument or file path for '${cmd}'.` }));
                    }
                }
            } else {
                 if(cmd) {
                    explanationParts.push({ part: cmd, explanation: `Unknown command. Not found in cheatsheet.` });
                    tokens.slice(1).forEach(token => explanationParts.push({ part: token, explanation: `Argument or option for unknown command '${cmd}'.` }));
                }
            }
            return explanationParts;
        };

        const finalExplanation: CommandPart[] = [];
        const commandSegments = input.split('|');
        commandSegments.forEach((segment, segmentIndex) => {
            const tokens = segment.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
            const segmentExplanation = parseSingleCommand(tokens);
            finalExplanation.push(...segmentExplanation);
            if (segmentIndex < commandSegments.length - 1) {
                finalExplanation.push({ part: '|', explanation: 'The pipe operator. It takes the standard output of the command on its left and uses it as the standard input for the command on its right.' });
            }
        });
        setExplanation(finalExplanation);
    }, []);

    useEffect(() => { parseCommand(command); }, [command, parseCommand]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="command-input" className="block text-sm font-medium text-gray-300 mb-2">Command</label>
                <input id="command-input" type="text" value={command} onChange={(e) => setCommand(e.target.value)} placeholder="e.g., tar -czvf archive.tar.gz /path/to/dir" className="w-full bg-gray-900 border border-gray-600 rounded-md py-2.5 px-3 font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" autoComplete="off" spellCheck="false" />
            </div>
            {explanation ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Interactive Breakdown</label>
                        <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 font-mono text-lg flex flex-wrap gap-x-3 gap-y-1">
                            {explanation.map((item, index) => (
                                <span key={index} onMouseEnter={() => setHoveredPartIndex(index)} onMouseLeave={() => setHoveredPartIndex(null)} className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${hoveredPartIndex === index ? 'bg-indigo-500 text-white' : 'text-gray-300'}`}>{item.part}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Explanation</label>
                        <div className="space-y-2">
                            {explanation.map((item, index) => (
                                <div key={index} className={`p-3 rounded-md transition-all border ${hoveredPartIndex === index ? 'bg-indigo-900/50 border-indigo-700 shadow-lg' : 'bg-gray-900/70 border-gray-700'}`} onMouseEnter={() => setHoveredPartIndex(index)} onMouseLeave={() => setHoveredPartIndex(null)}>
                                    <code className="font-bold text-indigo-300">{item.part}</code>
                                    <p className="text-gray-300 text-sm mt-1">{item.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : <div className="text-center py-8 text-gray-500">Enter a command to see its breakdown.</div>}
        </div>
    );
};

// --- Permissions Explainer Component ---
type Role = 'user' | 'group' | 'others';
type Special = 'setuid' | 'setgid' | 'sticky';
type Permission = 'read' | 'write' | 'execute';
interface Permissions { user: { read: boolean; write: boolean; execute: boolean; }; group: { read: boolean; write: boolean; execute: boolean; }; others: { read: boolean; write: boolean; execute: boolean; }; special: { setuid: boolean; setgid: boolean; sticky: boolean; }; }

const PermissionsExplainer: React.FC = () => {
    const [permissions, setPermissions] = useState<Permissions>({ special: { setuid: false, setgid: false, sticky: false }, user: { read: true, write: true, execute: true }, group: { read: true, write: false, execute: true }, others: { read: true, write: false, execute: true } });
    const { octal, symbolic } = useMemo(() => {
        const p = permissions;
        const sO = (p.special.setuid ? 4 : 0) + (p.special.setgid ? 2 : 0) + (p.special.sticky ? 1 : 0);
        const uO = (p.user.read ? 4 : 0) + (p.user.write ? 2 : 0) + (p.user.execute ? 1 : 0);
        const gO = (p.group.read ? 4 : 0) + (p.group.write ? 2 : 0) + (p.group.execute ? 1 : 0);
        const oO = (p.others.read ? 4 : 0) + (p.others.write ? 2 : 0) + (p.others.execute ? 1 : 0);
        let uS = `${p.user.read ? 'r' : '-'}${p.user.write ? 'w' : '-'}${p.user.execute ? 'x' : '-'}`;
        let gS = `${p.group.read ? 'r' : '-'}${p.group.write ? 'w' : '-'}${p.group.execute ? 'x' : '-'}`;
        let oS = `${p.others.read ? 'r' : '-'}${p.others.write ? 'w' : '-'}${p.others.execute ? 'x' : '-'}`;
        if(p.special.setuid) uS = uS.slice(0, 2) + (p.user.execute ? 's' : 'S');
        if(p.special.setgid) gS = gS.slice(0, 2) + (p.group.execute ? 's' : 'S');
        if(p.special.sticky) oS = oS.slice(0, 2) + (p.others.execute ? 't' : 'T');
        return { octal: `${sO}${uO}${gO}${oO}`, symbolic: `-${uS}${gS}${oS}` }
    }, [permissions]);

    const handleOctalChange = (value: string) => {
        const cleanValue = value.replace(/[^0-7]/g, '').slice(-4);
        if (cleanValue.length < 3) return;
        const [s, u, g, o] = cleanValue.padStart(4, '0').split('').map(Number);
        setPermissions({ special: { setuid: (s & 4) > 0, setgid: (s & 2) > 0, sticky: (s & 1) > 0 }, user: { read: (u & 4) > 0, write: (u & 2) > 0, execute: (u & 1) > 0 }, group: { read: (g & 4) > 0, write: (g & 2) > 0, execute: (g & 1) > 0 }, others: { read: (o & 4) > 0, write: (o & 2) > 0, execute: (o & 1) > 0 } });
    };
    const handlePermissionToggle = (role: Role, p: Permission) => setPermissions(s => ({ ...s, [role]: { ...s[role], [p]: !s[role][p] } }));
    const handleSpecialToggle = (p: Special) => setPermissions(s => ({ ...s, special: { ...s.special, [p]: !s.special[p] } }));
    
    const PermissionCheckbox: React.FC<{ l: string; p: string; c: boolean; o: () => void; }> = ({ l, p, c, o }) => (<label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-700/50 transition-colors"><input type="checkbox" className="sr-only" checked={c} onChange={o} /><div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${c ? 'bg-indigo-500' : 'bg-gray-600'}`}>{c && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}</div><div><span className="text-gray-200">{l}</span><span className="text-gray-400 font-mono text-xs ml-1">({p})</span></div></label>);
    const PermissionGroup: React.FC<{ t: string; p: { read: boolean; write: boolean; execute: boolean; }; o: (p: Permission) => void;}> = ({ t, p, o }) => {
        const oV = (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
        const sV = `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
        const exp = [p.read&&'read', p.write&&'write', p.execute&&'execute'].filter(Boolean);
        const eT = exp.length > 0 ? `can ${exp.join(', ')} the file/directory.` : 'is not allowed to do anything.';
        return (<div className="bg-gray-900/50 p-4 rounded-lg"><h3 className="text-lg font-semibold text-white">{t}</h3><div className="flex items-center justify-between mt-2 mb-3"><p className="font-mono text-3xl text-indigo-300">{oV}</p><p className="font-mono text-xl text-gray-400">{sV}</p></div><div className="space-y-2"><PermissionCheckbox l="Read" p="4" c={p.read} o={()=>o('read')} /><PermissionCheckbox l="Write" p="2" c={p.write} o={()=>o('write')} /><PermissionCheckbox l="Execute" p="1" c={p.execute} o={()=>o('execute')} /></div><p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-700/50">The <span className="font-semibold text-gray-300">{t.toLowerCase()}</span> {eT}</p></div>);
    };

    return (<div className="space-y-6"><div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-900/50 p-4 rounded-lg"><div><label htmlFor="octal-input" className="block text-sm font-medium text-gray-300 mb-2">Octal Value</label><input id="octal-input" type="text" value={octal} onChange={(e) => handleOctalChange(e.target.value)} className="w-full bg-gray-900 border border-gray-600 font-mono text-xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div><div><label className="block text-sm font-medium text-gray-300 mb-2">Symbolic Notation</label><input type="text" readOnly value={symbolic} className="w-full bg-gray-900 border border-gray-600 font-mono text-xl p-2 rounded-md focus:outline-none" /></div></div><details className="p-4 bg-gray-900/50 rounded-lg group" open><summary className="text-md font-semibold text-gray-300 list-none flex justify-between items-center cursor-pointer">Special Permissions<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform text-gray-400 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></summary><div className="mt-3 pt-3 border-t border-gray-700/50 grid grid-cols-1 md:grid-cols-3 gap-4"><PermissionCheckbox l="SetUID" p="4" c={permissions.special.setuid} o={() => handleSpecialToggle('setuid')} /><PermissionCheckbox l="SetGID" p="2" c={permissions.special.setgid} o={() => handleSpecialToggle('setgid')} /><PermissionCheckbox l="Sticky Bit" p="1" c={permissions.special.sticky} o={() => handleSpecialToggle('sticky')} /><p className="text-xs text-gray-400 md:col-span-3"><strong className="text-gray-300">SetUID:</strong> Run as file owner. <strong className="text-gray-300">SetGID:</strong> Run as file group / new files inherit parent directory's group. <strong className="text-gray-300">Sticky Bit:</strong> Only file owner can delete files in this directory.</p></div></details><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><PermissionGroup t="User (Owner)" p={permissions.user} o={(p) => handlePermissionToggle('user', p)} /><PermissionGroup t="Group" p={permissions.group} o={(p) => handlePermissionToggle('group', p)} /><PermissionGroup t="Others" p={permissions.others} o={(p) => handlePermissionToggle('others', p)} /></div></div>);
};

// --- Filesystem Explainer Component ---
const FilesystemExplainer: React.FC = () => {
    const [selectedPath, setSelectedPath] = useState<string>('/');
    const selectedEntry = FILESYSTEM_DATA.find(entry => entry.path === selectedPath);
    const FolderIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>);
    return (<div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 grid grid-cols-1 md:grid-cols-3"><div className="md:col-span-1 border-r border-gray-700"><div className="p-4 border-b border-gray-700"><h3 className="text-lg font-semibold text-white">Filesystem Hierarchy</h3></div><ul className="max-h-96 md:max-h-[32rem] overflow-y-auto">{FILESYSTEM_DATA.map(entry => (<li key={entry.path}><button onClick={() => setSelectedPath(entry.path)} className={`w-full text-left p-3 flex items-center transition-colors font-mono text-sm ${selectedPath === entry.path ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}><FolderIcon />{entry.path}</button></li>))}</ul></div><div className="md:col-span-2 p-6">{selectedEntry ? (<div className="space-y-6"><div><h3 className="text-3xl font-bold font-mono text-indigo-300">{selectedEntry.path}</h3><p className="mt-2 text-gray-300">{selectedEntry.description}</p></div><div><h4 className="font-semibold text-gray-200 mb-2">Typical Contents</h4><div className="bg-gray-900/70 p-3 rounded-lg"><code className="text-sm text-gray-400 whitespace-pre-wrap">{selectedEntry.contains.join(', ')}</code></div></div><div><h4 className="font-semibold text-gray-200 mb-2">Key Info</h4><div className="bg-gray-900/70 p-4 rounded-lg flex items-start space-x-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p className="text-sm text-gray-300">{selectedEntry.keyInfo}</p></div></div></div>) : (<div className="flex items-center justify-center h-full"><p className="text-gray-500">Select a directory to see its details.</p></div>)}</div></div>);
};

// --- Main Combined Component ---
const LinuxReference: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('command');
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Linux Reference</h2>
            <div className="mb-6 border-b border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('command')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'command' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Command Explainer</button>
                    <button onClick={() => setActiveTab('permissions')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'permissions' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Permissions Calculator</button>
                    <button onClick={() => setActiveTab('filesystem')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'filesystem' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Filesystem Explorer</button>
                </nav>
            </div>
            <div>
                {activeTab === 'command' && <CommandExplainer />}
                {activeTab === 'permissions' && <PermissionsExplainer />}
                {activeTab === 'filesystem' && <FilesystemExplainer />}
            </div>
        </div>
    );
};

export default LinuxReference;
