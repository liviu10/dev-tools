import React, { useState, useMemo } from 'react';

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
    
    const PermissionCheckbox: React.FC<{ l: string; p: string; c: boolean; o: () => void; }> = ({ l, p, c, o }) => (<label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"><input type="checkbox" className="sr-only" checked={c} onChange={o} /><div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${c ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}>{c && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}</div><div><span className="text-gray-800 dark:text-gray-200">{l}</span><span className="text-gray-500 dark:text-gray-400 font-mono text-xs ml-1">({p})</span></div></label>);
    const PermissionGroup: React.FC<{ t: string; p: { read: boolean; write: boolean; execute: boolean; }; o: (p: Permission) => void;}> = ({ t, p, o }) => {
        const oV = (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
        const sV = `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
        const exp = [p.read&&'read', p.write&&'write', p.execute&&'execute'].filter(Boolean);
        const eT = exp.length > 0 ? `can ${exp.join(', ')} the file/directory.` : 'is not allowed to do anything.';
        return (<div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t}</h3><div className="flex items-center justify-between mt-2 mb-3"><p className="font-mono text-3xl text-indigo-500 dark:text-indigo-300">{oV}</p><p className="font-mono text-xl text-gray-500 dark:text-gray-400">{sV}</p></div><div className="space-y-2"><PermissionCheckbox l="Read" p="4" c={p.read} o={()=>o('read')} /><PermissionCheckbox l="Write" p="2" c={p.write} o={()=>o('write')} /><PermissionCheckbox l="Execute" p="1" c={p.execute} o={()=>o('execute')} /></div><p className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/50">The <span className="font-semibold text-gray-600 dark:text-gray-300">{t.toLowerCase()}</span> {eT}</p></div>);
    };

    return (<div className="space-y-6"><div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg"><div><label htmlFor="octal-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Octal Value</label><input id="octal-input" type="text" value={octal} onChange={(e) => handleOctalChange(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 font-mono text-xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div><div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Symbolic Notation</label><input type="text" readOnly value={symbolic} className="w-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 font-mono text-xl p-2 rounded-md focus:outline-none" /></div></div><details className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg group" open><summary className="text-md font-semibold text-gray-700 dark:text-gray-300 list-none flex justify-between items-center cursor-pointer">Special Permissions<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform text-gray-400 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></summary><div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/50 grid grid-cols-1 md:grid-cols-3 gap-4"><PermissionCheckbox l="SetUID" p="4" c={permissions.special.setuid} o={() => handleSpecialToggle('setuid')} /><PermissionCheckbox l="SetGID" p="2" c={permissions.special.setgid} o={() => handleSpecialToggle('setgid')} /><PermissionCheckbox l="Sticky Bit" p="1" c={permissions.special.sticky} o={() => handleSpecialToggle('sticky')} /><p className="text-xs text-gray-500 dark:text-gray-400 md:col-span-3"><strong className="text-gray-600 dark:text-gray-300">SetUID:</strong> Run as file owner. <strong className="text-gray-600 dark:text-gray-300">SetGID:</strong> Run as file group / new files inherit parent directory's group. <strong className="text-gray-600 dark:text-gray-300">Sticky Bit:</strong> Only file owner can delete files in this directory.</p></div></details><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><PermissionGroup t="User (Owner)" p={permissions.user} o={(p) => handlePermissionToggle('user', p)} /><PermissionGroup t="Group" p={permissions.group} o={(p) => handlePermissionToggle('group', p)} /><PermissionGroup t="Others" p={permissions.others} o={(p) => handlePermissionToggle('others', p)} /></div></div>);
};

export default PermissionsExplainer;