import React, { useState, useMemo, useCallback } from 'react';

type Role = 'user' | 'group' | 'others';
type Special = 'setuid' | 'setgid' | 'sticky';
type Permission = 'read' | 'write' | 'execute';

interface Permissions {
    user: { read: boolean; write: boolean; execute: boolean; };
    group: { read: boolean; write: boolean; execute: boolean; };
    others: { read: boolean; write: boolean; execute: boolean; };
    special: { setuid: boolean; setgid: boolean; sticky: boolean; };
}

const PermissionCheckbox: React.FC<{ label: string; permission: string; checked: boolean; onChange: () => void; }> = ({ label, permission, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-700/50 transition-colors">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${checked ? 'bg-indigo-500' : 'bg-gray-600'}`}>
            {checked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
        </div>
        <div>
            <span className="text-gray-200">{label}</span>
            <span className="text-gray-400 font-mono text-xs ml-1">({permission})</span>
        </div>
    </label>
);

const PermissionGroup: React.FC<{
    title: string;
    permissions: { read: boolean; write: boolean; execute: boolean; };
    onToggle: (permission: Permission) => void;
}> = ({ title, permissions, onToggle }) => {
    
    const octalValue = (permissions.read ? 4 : 0) + (permissions.write ? 2 : 0) + (permissions.execute ? 1 : 0);
    const symbolicValue = `${permissions.read ? 'r' : '-'}${permissions.write ? 'w' : '-'}${permissions.execute ? 'x' : '-'}`;

    const explanations = [
        permissions.read && 'read',
        permissions.write && 'write',
        permissions.execute && 'execute'
    ].filter(Boolean);
    
    let explanationText = 'is not allowed to do anything.';
    if (explanations.length > 0) {
        explanationText = `can ${explanations.join(', ')} the file/directory.`;
    }

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <div className="flex items-center justify-between mt-2 mb-3">
                 <p className="font-mono text-3xl text-indigo-300">{octalValue}</p>
                 <p className="font-mono text-xl text-gray-400">{symbolicValue}</p>
            </div>
            <div className="space-y-2">
                <PermissionCheckbox label="Read" permission="4" checked={permissions.read} onChange={() => onToggle('read')} />
                <PermissionCheckbox label="Write" permission="2" checked={permissions.write} onChange={() => onToggle('write')} />
                <PermissionCheckbox label="Execute" permission="1" checked={permissions.execute} onChange={() => onToggle('execute')} />
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-700/50">
                The <span className="font-semibold text-gray-300">{title.toLowerCase()}</span> {explanationText}
            </p>
        </div>
    );
};


const LinuxPermissionsExplainer: React.FC = () => {
    const [permissions, setPermissions] = useState<Permissions>({
        special: { setuid: false, setgid: false, sticky: false },
        user: { read: true, write: true, execute: true },
        group: { read: true, write: false, execute: true },
        others: { read: true, write: false, execute: true },
    });
    
    const { octal, symbolic } = useMemo(() => {
        const perms = permissions;
        const specialOctal = (perms.special.setuid ? 4 : 0) + (perms.special.setgid ? 2 : 0) + (perms.special.sticky ? 1 : 0);
        const userOctal = (perms.user.read ? 4 : 0) + (perms.user.write ? 2 : 0) + (perms.user.execute ? 1 : 0);
        const groupOctal = (perms.group.read ? 4 : 0) + (perms.group.write ? 2 : 0) + (perms.group.execute ? 1 : 0);
        const othersOctal = (perms.others.read ? 4 : 0) + (perms.others.write ? 2 : 0) + (perms.others.execute ? 1 : 0);
        
        let userSymbol = `${perms.user.read ? 'r' : '-'}${perms.user.write ? 'w' : '-'}${perms.user.execute ? 'x' : '-'}`;
        let groupSymbol = `${perms.group.read ? 'r' : '-'}${perms.group.write ? 'w' : '-'}${perms.group.execute ? 'x' : '-'}`;
        let othersSymbol = `${perms.others.read ? 'r' : '-'}${perms.others.write ? 'w' : '-'}${perms.others.execute ? 'x' : '-'}`;

        if(perms.special.setuid) userSymbol = userSymbol.slice(0, 2) + (perms.user.execute ? 's' : 'S');
        if(perms.special.setgid) groupSymbol = groupSymbol.slice(0, 2) + (perms.group.execute ? 's' : 'S');
        if(perms.special.sticky) othersSymbol = othersSymbol.slice(0, 2) + (perms.others.execute ? 't' : 'T');

        return {
            octal: `${specialOctal}${userOctal}${groupOctal}${othersOctal}`,
            symbolic: `-${userSymbol}${groupSymbol}${othersSymbol}`
        }
    }, [permissions]);

    const handleOctalChange = (value: string) => {
        const cleanValue = value.replace(/[^0-7]/g, '').slice(-4);
        if (cleanValue.length < 3) return;

        const paddedValue = cleanValue.padStart(4, '0');
        const [s, u, g, o] = paddedValue.split('').map(Number);

        setPermissions({
            special: { setuid: (s & 4) > 0, setgid: (s & 2) > 0, sticky: (s & 1) > 0 },
            user: { read: (u & 4) > 0, write: (u & 2) > 0, execute: (u & 1) > 0 },
            group: { read: (g & 4) > 0, write: (g & 2) > 0, execute: (g & 1) > 0 },
            others: { read: (o & 4) > 0, write: (o & 2) > 0, execute: (o & 1) > 0 },
        });
    };

    const handlePermissionToggle = (role: Role, permission: Permission) => {
        setPermissions(p => ({
            ...p,
            [role]: { ...p[role], [permission]: !p[role][permission] }
        }));
    };

    const handleSpecialToggle = (permission: Special) => {
        setPermissions(p => ({
            ...p,
            special: { ...p.special, [permission]: !p.special[permission] }
        }));
    };


    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Linux Permissions Explainer</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-900/50 p-4 rounded-lg">
                    <div>
                        <label htmlFor="octal-input" className="block text-sm font-medium text-gray-300 mb-2">Octal Value</label>
                        <input
                            id="octal-input"
                            type="text"
                            value={octal}
                            onChange={(e) => handleOctalChange(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 font-mono text-xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Symbolic Notation</label>
                        <input
                            type="text"
                            readOnly
                            value={symbolic}
                            className="w-full bg-gray-900 border border-gray-600 font-mono text-xl p-2 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                <details className="p-4 bg-gray-900/50 rounded-lg group" open>
                    <summary className="text-md font-semibold text-gray-300 list-none flex justify-between items-center cursor-pointer">
                        Special Permissions
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform text-gray-400 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="mt-3 pt-3 border-t border-gray-700/50 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <PermissionCheckbox label="SetUID" permission="4" checked={permissions.special.setuid} onChange={() => handleSpecialToggle('setuid')} />
                        <PermissionCheckbox label="SetGID" permission="2" checked={permissions.special.setgid} onChange={() => handleSpecialToggle('setgid')} />
                        <PermissionCheckbox label="Sticky Bit" permission="1" checked={permissions.special.sticky} onChange={() => handleSpecialToggle('sticky')} />
                         <p className="text-xs text-gray-400 md:col-span-3">
                             <strong className="text-gray-300">SetUID:</strong> Run as file owner. <strong className="text-gray-300">SetGID:</strong> Run as file group / new files inherit parent directory's group. <strong className="text-gray-300">Sticky Bit:</strong> Only file owner can delete files in this directory.
                         </p>
                    </div>
                </details>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PermissionGroup title="User (Owner)" permissions={permissions.user} onToggle={(p) => handlePermissionToggle('user', p)} />
                    <PermissionGroup title="Group" permissions={permissions.group} onToggle={(p) => handlePermissionToggle('group', p)} />
                    <PermissionGroup title="Others" permissions={permissions.others} onToggle={(p) => handlePermissionToggle('others', p)} />
                </div>

            </div>
        </div>
    );
};

export default LinuxPermissionsExplainer;