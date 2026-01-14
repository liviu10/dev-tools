import React, { useState, useMemo, useCallback, useEffect } from 'react';

// --- Helper Components ---

const CodeBlock: React.FC<{ language: string; code: string; onCopy: () => void; copied: boolean }> = ({ language, code, onCopy, copied }) => (
    <div>
        <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-300">{language}</label>
            <button
                onClick={onCopy}
                className="text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 px-3 py-1 rounded-md transition"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
        <textarea
            readOnly
            value={code}
            className="w-full h-48 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none resize-none"
            aria-label={`${language} code`}
        />
    </div>
);

const Slider: React.FC<{ label: string; value: number; min: number; max: number; step?: number; unit?: string; disabled?: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = 
({ label, value, min, max, step = 1, unit, disabled = false, onChange }) => (
    <div className={disabled ? 'opacity-50' : ''}>
        <label className="text-gray-300 mb-2 flex justify-between text-sm">
            <span>{label}</span>
            <span className="bg-gray-700 text-white text-xs font-semibold w-20 text-center py-0.5 rounded-md">{value}{unit}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:cursor-not-allowed"
        />
    </div>
);

const RadioGroup: React.FC<{ label: string, options: {value: string, label: string}[], selected: string, onChange: (value: string) => void}> = 
({ label, options, selected, onChange }) => (
     <div>
        <span className="text-gray-300 text-sm font-medium">{label}</span>
        <div className="flex items-center space-x-2 bg-gray-900 p-1 rounded-md mt-2">
            {options.map(opt => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`flex-1 text-center px-3 py-1.5 text-xs rounded-md transition ${selected === opt.value ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    </div>
);

const ControlSection: React.FC<{ title: string, children: React.ReactNode, disabled?: boolean }> = ({ title, children, disabled = false }) => (
     <details className={`p-4 bg-gray-900/50 rounded-lg group ${disabled ? 'opacity-50' : ''}`} open={!disabled}>
        <summary className={`text-md font-semibold text-gray-300 list-none flex justify-between items-center ${disabled ? '' : 'cursor-pointer'}`}>
            {title}
             <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform text-gray-400 ${disabled ? 'hidden' : 'group-open:rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </summary>
        <div className="mt-3 space-y-4 pt-3 border-t border-gray-700/50">
            {children}
        </div>
    </details>
);

type ContentType = 'empty' | 'text' | 'button' | 'card' | 'image' | 'input';

interface ItemContent {
    type: ContentType;
    props: { [key: string]: any };
}
type ItemContentMap = { [key: string]: ItemContent };

// --- Preview Components ---

const PreviewItemContent: React.FC<{ item: ItemContent; index: number; prefix: string; }> = ({ item, index, prefix }) => {
    const { type, props } = item;
    const TitleTag = props.titleTag || 'h4';
    const ContentTag = props.contentTag || 'p';

    switch (type) {
        case 'text':
            return <div className="text-left p-2 overflow-hidden">
                {props.title && <TitleTag className="font-bold text-white text-sm truncate">{props.title}</TitleTag>}
                {props.content && <ContentTag className="text-gray-400 text-xs mt-1">{props.content}</ContentTag>}
            </div>;
        case 'button':
             const btnBase = "text-xs font-bold py-1.5 px-3 rounded-md";
             const btnStyles = {
                primary: "bg-indigo-600 text-white hover:bg-indigo-700",
                secondary: "bg-gray-600 text-white hover:bg-gray-700",
                outline: "bg-transparent border border-indigo-500 text-indigo-400 hover:bg-indigo-500/20",
             };
            return <button className={`${btnBase} ${btnStyles[props.style] || btnStyles.primary}`}>{props.text || 'Click Me'}</button>;
        case 'card':
            const cardLayout = props.layout === 'horizontal' ? 'sm:flex-row' : 'flex-col';
            const shadowClass = { sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg' }[props.shadow] || '';
            return <div className={`bg-gray-700 w-full h-full rounded-md flex ${cardLayout} overflow-hidden ${shadowClass}`}>
                <div className={`flex-shrink-0 flex items-center justify-center ${props.layout === 'horizontal' ? 'w-1/3' : 'h-1/2'} ${props.imageUrl ? '' : 'bg-gray-600'}`}>
                    {props.imageUrl ? <img src={props.imageUrl} alt={props.title || 'Card Image'} className="w-full h-full object-cover"/> : <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                </div>
                <div className="p-2 text-left flex flex-col">
                     <h5 className="font-bold text-white text-xs truncate">{props.title || 'Card Title'}</h5>
                     <p className="text-gray-400 text-[10px] mt-0.5 flex-grow">{props.content || 'Some text...'}</p>
                     {props.buttonText && <button className="bg-indigo-600 text-white text-[10px] font-bold py-1 px-2 rounded-sm mt-1 self-start">{props.buttonText}</button>}
                </div>
            </div>;
        case 'image':
             return props.src ? 
                <figure className="w-full h-full">
                    <img src={props.src} alt={props.alt || 'Placeholder'} className="w-full h-full object-cover rounded-sm" style={{ objectFit: props.fit || 'cover' }} />
                    {props.caption && <figcaption className="text-[10px] text-gray-400 mt-1 text-center">{props.caption}</figcaption>}
                </figure> :
                <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-sm">
                    <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>;
        case 'input':
            return <div className="w-full p-1">
                {props.label && <label className="text-xs text-gray-300 mb-1 block text-left">{props.label}</label>}
                <input type={props.type || 'text'} placeholder={props.placeholder || 'Placeholder text'} className="w-full bg-gray-900/80 border border-gray-600 text-white text-xs rounded-md p-2" />
            </div>;
        case 'empty':
        default:
            return <>{prefix} {index + 1}</>;
    }
};

const PreviewItem: React.FC<{
    itemKey: string;
    item: ItemContent;
    onTypeChange: (key: string, type: ContentType) => void;
    onEdit: (key: string) => void;
    children: React.ReactNode;
}> = ({ itemKey, item, onTypeChange, onEdit, children }) => {
    return (
        <div className="bg-gray-800 border border-gray-900 rounded text-gray-300 text-center flex items-center justify-center text-xs p-1 min-h-[3rem] relative group">
            {children}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                 {item.type !== 'empty' && (
                    <button onClick={() => onEdit(itemKey)} className="p-1 bg-gray-900/80 text-white rounded-sm hover:bg-gray-700" title="Edit Content">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    </button>
                 )}
                <select 
                    value={item.type} 
                    onChange={e => onTypeChange(itemKey, e.target.value as ContentType)}
                    className="bg-gray-900/80 text-white text-[10px] rounded-sm border-gray-700 focus:ring-1 focus:ring-indigo-500"
                    onClick={e => e.stopPropagation()}
                >
                    <option value="empty">Empty</option>
                    <option value="text">Text</option>
                    <option value="button">Button</option>
                    <option value="card">Card</option>
                    <option value="image">Image</option>
                    <option value="input">Input Field</option>
                </select>
            </div>
        </div>
    );
};

// --- Modal Component ---
const SettingsModal: React.FC<{ item: ItemContent | null; itemKey: string | null; onSave: (key: string, props: any) => void; onClose: () => void; }> = ({ item, itemKey, onSave, onClose }) => {
    const [props, setProps] = useState(item?.props || {});

    useEffect(() => { setProps(item?.props || {}); }, [item]);
    
    if (!item || !itemKey) return null;

    const handlePropChange = (key: string, value: any) => setProps(prev => ({...prev, [key]: value}));
    const handleSave = () => { onSave(itemKey, props); onClose(); };

    const renderForm = () => {
        const commonFields = <>
            <div><label className="text-sm text-gray-400">Custom CSS Classes</label><input type="text" value={props.customClasses || ''} onChange={e => handlePropChange('customClasses', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
            <div><label className="text-sm text-gray-400">HTML ID</label><input type="text" value={props.id || ''} onChange={e => handlePropChange('id', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
        </>;
        switch(item.type) {
            case 'text': return <>
                <h4 className="text-md font-semibold text-gray-300">Content</h4>
                <div><label className="text-sm text-gray-400">Title</label><input type="text" value={props.title || ''} onChange={e => handlePropChange('title', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Content</label><textarea value={props.content || ''} onChange={e => handlePropChange('content', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md h-24" /></div>
                <h4 className="text-md font-semibold text-gray-300 pt-3 border-t border-gray-700">Structure</h4>
                <div><label className="text-sm text-gray-400">Title Tag</label><select value={props.titleTag || 'h4'} onChange={e => handlePropChange('titleTag', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md"><option>h1</option><option>h2</option><option>h3</option><option>h4</option><option>h5</option><option>h6</option></select></div>
                <div><label className="text-sm text-gray-400">Content Tag</label><select value={props.contentTag || 'p'} onChange={e => handlePropChange('contentTag', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md"><option>p</option><option>div</option><option>span</option></select></div>
                {commonFields}
            </>;
            case 'button': return <>
                <div><label className="text-sm text-gray-400">Button Text</label><input type="text" value={props.text || ''} onChange={e => handlePropChange('text', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Link (href)</label><input type="text" value={props.href || ''} placeholder="e.g., https://example.com" onChange={e => handlePropChange('href', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Style</label><select value={props.style || 'primary'} onChange={e => handlePropChange('style', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md"><option value="primary">Primary</option><option value="secondary">Secondary</option><option value="outline">Outline</option></select></div>
                {commonFields}
            </>;
            case 'card': return <>
                <h4 className="text-md font-semibold text-gray-300">Content</h4>
                <div><label className="text-sm text-gray-400">Image URL</label><input type="text" value={props.imageUrl || ''} onChange={e => handlePropChange('imageUrl', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Card Title</label><input type="text" value={props.title || ''} onChange={e => handlePropChange('title', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Card Content</label><textarea value={props.content || ''} onChange={e => handlePropChange('content', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md h-24" /></div>
                <div><label className="text-sm text-gray-400">Button Text (optional)</label><input type="text" value={props.buttonText || ''} onChange={e => handlePropChange('buttonText', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <h4 className="text-md font-semibold text-gray-300 pt-3 border-t border-gray-700">Styling</h4>
                <div><label className="text-sm text-gray-400">Layout</label><select value={props.layout || 'vertical'} onChange={e => handlePropChange('layout', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md"><option value="vertical">Vertical</option><option value="horizontal">Horizontal</option></select></div>
                <div><label className="text-sm text-gray-400">Shadow</label><select value={props.shadow || 'none'} onChange={e => handlePropChange('shadow', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md"><option value="none">None</option><option value="sm">Small</option><option value="md">Medium</option><option value="lg">Large</option></select></div>
                {commonFields}
            </>;
            case 'image': return <>
                <div><label className="text-sm text-gray-400">Image Source URL</label><input type="text" value={props.src || ''} onChange={e => handlePropChange('src', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Alt Text</label><input type="text" value={props.alt || ''} onChange={e => handlePropChange('alt', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Caption</label><input type="text" value={props.caption || ''} onChange={e => handlePropChange('caption', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Image Fit</label><select value={props.fit || 'cover'} onChange={e => handlePropChange('fit', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md"><option value="cover">Cover</option><option value="contain">Contain</option><option value="fill">Fill</option></select></div>
                {commonFields}
            </>;
            case 'input': return <>
                <div><label className="text-sm text-gray-400">Label Text</label><input type="text" value={props.label || ''} onChange={e => handlePropChange('label', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Placeholder Text</label><input type="text" value={props.placeholder || ''} onChange={e => handlePropChange('placeholder', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md" /></div>
                <div><label className="text-sm text-gray-400">Input Type</label><select value={props.type || 'text'} onChange={e => handlePropChange('type', e.target.value)} className="mt-1 w-full bg-gray-700 p-2 rounded-md"><option>text</option><option>email</option><option>password</option><option>number</option></select></div>
                <label className="flex items-center space-x-2 mt-2"><input type="checkbox" checked={!!props.required} onChange={e => handlePropChange('required', e.target.checked)} className="rounded bg-gray-700 border-gray-500 text-indigo-500" /><span className="text-sm text-gray-400">Required</span></label>
                {commonFields}
            </>;
            default: return <p>This element has no customizable properties.</p>
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-semibold text-white mb-4 capitalize">Edit {item.type} Settings</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">{renderForm()}</div>
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
                    <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                    <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition">Save</button>
                </div>
            </div>
        </div>
    );
}

const getDefaultPropsForType = (type: ContentType): ItemContent => {
    const base = { type, props: {} };
    switch (type) {
        case 'text': base.props = { title: '', content: '', titleTag: 'h4', contentTag: 'p' }; break;
        case 'button': base.props = { text: 'Click Me', style: 'primary' }; break;
        case 'card': base.props = { title: 'Card Title', content: 'Some text...', layout: 'vertical', shadow: 'none' }; break;
        case 'image': base.props = { fit: 'cover' }; break;
        case 'input': base.props = { type: 'text', placeholder: 'Placeholder...' }; break;
    }
    return base;
};

// --- Main Generator Component ---

const HtmlLayoutGenerator: React.FC = () => {
    // Page structure
    const [includeHeader, setIncludeHeader] = useState(true);
    const [includeFooter, setIncludeFooter] = useState(true);
    const [sidebarOption, setSidebarOption] = useState<'none' | 'left' | 'right'>('left');

    // Layout dimensions
    const [dimensions, setDimensions] = useState({
        header: { cols: 3, rows: 1 }, sidebar: { cols: 1, rows: 4 }, footer: { cols: 4, rows: 1 },
        main: { cols: 3, rows: 2 },
    });
    
    // Gap dimensions
    const [gaps, setGaps] = useState({
        header: { row: 1, col: 1 },
        sidebar: { row: 1, col: 1 },
        main: { row: 1, col: 1 },
        footer: { row: 1, col: 1 },
    });
    
    // Content types
    const [itemContents, setItemContents] = useState<ItemContentMap>({});
    const [editingItemKey, setEditingItemKey] = useState<string | null>(null);

    const [copied, setCopied] = useState<'html' | 'css' | null>(null);

    useEffect(() => { setItemContents({}); }, [dimensions, includeHeader, includeFooter, sidebarOption]);

    const handleDimensionChange = (section: keyof typeof dimensions, dim: 'cols' | 'rows', value: number) => setDimensions(prev => ({ ...prev, [section]: { ...prev[section], [dim]: value } }));
    const handleGapChange = (section: keyof typeof gaps, dim: 'row' | 'col', value: number) => setGaps(prev => ({ ...prev, [section]: { ...prev[section], [dim]: value } }));
    const handleItemTypeChange = (key: string, type: ContentType) => setItemContents(prev => ({ ...prev, [key]: getDefaultPropsForType(type) }));
    const handleSaveItemProps = (key: string, props: any) => setItemContents(prev => ({...prev, [key]: {...prev[key], props }}));

    const generatedLayout = useMemo(() => {
        const getItemContentHTML = (item: ItemContent): string => {
            const { type, props } = item;
            const TitleTag = props.titleTag || 'h4';
            const ContentTag = props.contentTag || 'p';
            const idAttr = props.id ? ` id="${props.id}"` : '';
            const classAttr = props.customClasses ? ` class="${props.customClasses}"` : '';

            switch (type) {
                case 'text': return (props.title || props.content) ? `      <div${idAttr}${classAttr}>
        ${props.title ? `<${TitleTag}>${props.title}</${TitleTag}>` : ''}
        ${props.content ? `<${ContentTag}>${props.content}</${ContentTag}>` : ''}
      </div>` : `<div${idAttr}${classAttr}></div>`;
                case 'button':
                    const btnTag = props.href ? 'a' : 'button';
                    const hrefAttr = props.href ? ` href="${props.href}"` : '';
                    const btnClass = `btn btn-${props.style || 'primary'}${props.customClasses ? ' ' + props.customClasses : ''}`;
                    return `      <${btnTag}${idAttr} class="${btnClass}"${hrefAttr}>${props.text || 'Click Me'}</${btnTag}>`;
                case 'card':
                     const cardClass = `card card-${props.layout || 'vertical'} shadow-${props.shadow || 'none'}${props.customClasses ? ' ' + props.customClasses : ''}`;
                     return `      <div${idAttr} class="${cardClass}">
        <div class="card-image">${props.imageUrl ? `<img src="${props.imageUrl}" alt="${props.title || ''}"/>` : '<!-- Image -->'}</div>
        <div class="card-body">
          <h5>${props.title || 'Card Title'}</h5>
          <p>${props.content || 'Some text...'}</p>
          ${props.buttonText ? `<button class="btn btn-primary">${props.buttonText}</button>` : ''}
        </div>
      </div>`;
                case 'image': return `      <figure${idAttr}${classAttr}>
        <img src="${props.src || 'https://via.placeholder.com/150'}" alt="${props.alt || 'Placeholder'}" style="object-fit: ${props.fit || 'cover'};" />
        ${props.caption ? `<figcaption>${props.caption}</figcaption>` : ''}
      </figure>`;
                case 'input':
                    const requiredAttr = props.required ? ' required' : '';
                    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
                    return (props.label ? `      <label for="${inputId}">${props.label}</label>\n` : '') + `      <input${idAttr} class="${props.customClasses || ''}" type="${props.type || 'text'}" placeholder="${props.placeholder || ''}"${requiredAttr} />`;
                default: return '';
            }
        };

        const generateGridItems = (count: number, itemClass: string, prefix: string, section: string) => {
             if (count === 0) return '';
             return Array.from({ length: count }, (_, i) => {
                const key = `${section}-${i}`;
                const item = itemContents[key] || { type: 'empty', props: {} };
                const contentHTML = getItemContentHTML(item);
                const itemContent = contentHTML ? `\n${contentHTML}\n    ` : ` ${prefix} ${i + 1} `;
                return `    <div class="${itemClass}">${itemContent}</div>`;
             }).join('\n');
        };

        const hasSidebar = sidebarOption !== 'none';
        const d = dimensions;
        
        const counts = {
            header: includeHeader ? d.header.cols * d.header.rows : 0,
            sidebar: hasSidebar ? d.sidebar.cols * d.sidebar.rows : 0,
            footer: includeFooter ? d.footer.cols * d.footer.rows : 0,
            main: d.main.cols * d.main.rows,
        };
        
        const mainContentItems = generateGridItems(counts.main, 'grid-item', 'Item', 'main');

        let html = '<div class="page-container">\n';
        if (includeHeader) html += `  <header class="header">\n${generateGridItems(counts.header, 'header-item', 'H', 'header')}\n  </header>\n`;
        if (sidebarOption === 'left') html += `  <aside class="sidebar">\n${generateGridItems(counts.sidebar, 'sidebar-item', 'S', 'sidebar')}\n  </aside>\n`;
        html += `  <main class="main-content">\n${mainContentItems}\n  </main>\n`;
        if (sidebarOption === 'right') html += `  <aside class="sidebar">\n${generateGridItems(counts.sidebar, 'sidebar-item', 'S', 'sidebar')}\n  </aside>\n`;
        if (includeFooter) html += `  <footer class="footer">\n${generateGridItems(counts.footer, 'footer-item', 'F', 'footer')}\n  </footer>\n`;
        html += '</div>';
        
        const areasRows: string[] = [];
        if (includeHeader) areasRows.push(hasSidebar ? 'header header' : 'header');
        areasRows.push(sidebarOption === 'left' ? 'sidebar main' : sidebarOption === 'right' ? 'main sidebar' : 'main');
        if (includeFooter) areasRows.push(hasSidebar ? 'footer footer' : 'footer');
        
        const gridTemplateAreas = areasRows.map(row => `"${row}"`).join('\n  ');
        const gridTemplateColumns = hasSidebar ? (sidebarOption === 'left' ? '250px 1fr' : '1fr 250px') : '1fr';
        const gridTemplateRows = `${includeHeader ? 'auto ' : ''}1fr${includeFooter ? ' auto' : ''}`;

        const css = 
`.page-container { display: grid; grid-template-columns: ${gridTemplateColumns}; grid-template-rows: ${gridTemplateRows}; grid-template-areas:
  ${gridTemplateAreas}; height: 100vh; gap: 1rem; }
.header { grid-area: header; } .sidebar { grid-area: sidebar; } .main-content { grid-area: main; } .footer { grid-area: footer; }
.header, .footer, .sidebar, .main-content { display: grid; background-color: #4a5568; border: 1px solid #2d3748; padding: 1rem; border-radius: 0.5rem; }
.header { grid-template-columns: repeat(${d.header.cols}, 1fr); grid-template-rows: repeat(${d.header.rows}, auto); gap: ${gaps.header.row}rem ${gaps.header.col}rem; }
.sidebar { grid-template-columns: repeat(${d.sidebar.cols}, 1fr); grid-template-rows: repeat(${d.sidebar.rows}, auto); gap: ${gaps.sidebar.row}rem ${gaps.sidebar.col}rem; }
.footer { grid-template-columns: repeat(${d.footer.cols}, 1fr); grid-template-rows: repeat(${d.footer.rows}, auto); gap: ${gaps.footer.row}rem ${gaps.footer.col}rem; }
.main-content { grid-template-columns: repeat(${d.main.cols}, 1fr); grid-template-rows: repeat(${d.main.rows}, auto); gap: ${gaps.main.row}rem ${gaps.main.col}rem; }
.header-item, .sidebar-item, .footer-item, .grid-item { display: flex; align-items: center; justify-content: center; min-height: 4rem; border-radius: 0.25rem; background-color: #4a5568; border: 1px solid #2d3748; padding: 0.5rem; color: #e2e8f0; overflow: hidden; }
/* Component Styles */
.btn { display: inline-block; font-weight: bold; padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid transparent; cursor: pointer; text-decoration: none; text-align: center; }
.btn-primary { background-color: #4f46e5; color: white; }
.btn-secondary { background-color: #6b7280; color: white; }
.btn-outline { background-color: transparent; border-color: #6366f1; color: #a5b4fc; }
.card { background-color: #374151; border-radius: 0.375rem; overflow: hidden; display: flex; }
.card-vertical { flex-direction: column; }
.card-horizontal { flex-direction: row; }
.card-image { background-color: #4b5563; }
.card-vertical .card-image { height: 50%; }
.card-horizontal .card-image { width: 33.33%; }
.card-image img { width: 100%; height: 100%; object-fit: cover; }
.card-body { padding: 0.75rem; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
img { max-width: 100%; height: auto; }
input[type="text"] { background-color: #374151; border: 1px solid #4b5563; padding: 0.5rem; border-radius: 0.25rem; color: #e2e8f0; }`;
        
        return { htmlCode: html, cssCode: css };
    }, [includeHeader, includeFooter, sidebarOption, dimensions, gaps, itemContents]);
    
    const handleCopy = useCallback((type: 'html' | 'css') => {
        const textToCopy = type === 'html' ? generatedLayout.htmlCode : generatedLayout.cssCode;
        navigator.clipboard.writeText(textToCopy);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    }, [generatedLayout]);

    const d = dimensions;

    const hasSidebarPreview = sidebarOption !== 'none';
    const areasRowsPreview: string[] = [];
    if (includeHeader) areasRowsPreview.push(hasSidebarPreview ? `"header header"` : `"header"`);
    areasRowsPreview.push(
        sidebarOption === 'left' ? `"sidebar main"` : sidebarOption === 'right' ? `"main sidebar"` : `"main"`
    );
    if (includeFooter) areasRowsPreview.push(hasSidebarPreview ? `"footer footer"` : `"footer"`);
    const gridTemplateAreasPreview = areasRowsPreview.join(' ');
    
    const editingItem = editingItemKey ? itemContents[editingItemKey] || getDefaultPropsForType(itemContents[editingItemKey]?.type || 'empty') : null;

    return (
        <div>
            {editingItemKey && <SettingsModal item={editingItem} itemKey={editingItemKey} onSave={handleSaveItemProps} onClose={() => setEditingItemKey(null)} />}
            <h2 className="text-3xl font-bold mb-6 text-white">HTML Page Scaffolder</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Controls</h3>
                    <ControlSection title="Page Structure">
                        <label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-500 text-indigo-500" checked={includeHeader} onChange={(e) => setIncludeHeader(e.target.checked)} /><span className="text-gray-300 text-sm">Include Header</span></label>
                        <label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-500 text-indigo-500" checked={includeFooter} onChange={(e) => setIncludeFooter(e.target.checked)} /><span className="text-gray-300 text-sm">Include Footer</span></label>
                        <RadioGroup label="Sidebar" selected={sidebarOption} onChange={(val) => setSidebarOption(val as any)} options={[{ value: 'none', label: 'None' }, { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]} />
                    </ControlSection>
                    
                    <ControlSection title="Header Layout" disabled={!includeHeader}>
                        <Slider label="Columns" value={d.header.cols} min={1} max={12} disabled={!includeHeader} onChange={(e) => handleDimensionChange('header', 'cols', Number(e.target.value))} />
                        <Slider label="Rows" value={d.header.rows} min={1} max={6} disabled={!includeHeader} onChange={(e) => handleDimensionChange('header', 'rows', Number(e.target.value))} />
                        <Slider label="Column Gap" value={gaps.header.col} min={0} max={5} step={0.25} unit="rem" disabled={!includeHeader} onChange={(e) => handleGapChange('header', 'col', Number(e.target.value))} />
                        <Slider label="Row Gap" value={gaps.header.row} min={0} max={5} step={0.25} unit="rem" disabled={!includeHeader} onChange={(e) => handleGapChange('header', 'row', Number(e.target.value))} />
                    </ControlSection>
                    
                    <ControlSection title="Sidebar Layout" disabled={sidebarOption === 'none'}>
                        <Slider label="Columns" value={d.sidebar.cols} min={1} max={4} disabled={sidebarOption === 'none'} onChange={(e) => handleDimensionChange('sidebar', 'cols', Number(e.target.value))} />
                        <Slider label="Rows" value={d.sidebar.rows} min={1} max={12} disabled={sidebarOption === 'none'} onChange={(e) => handleDimensionChange('sidebar', 'rows', Number(e.target.value))} />
                        <Slider label="Column Gap" value={gaps.sidebar.col} min={0} max={5} step={0.25} unit="rem" disabled={sidebarOption === 'none'} onChange={(e) => handleGapChange('sidebar', 'col', Number(e.target.value))} />
                        <Slider label="Row Gap" value={gaps.sidebar.row} min={0} max={5} step={0.25} unit="rem" disabled={sidebarOption === 'none'} onChange={(e) => handleGapChange('sidebar', 'row', Number(e.target.value))} />
                    </ControlSection>

                    <ControlSection title="Main Content Layout">
                        <Slider label="Item Columns" value={d.main.cols} min={1} max={12} onChange={(e) => handleDimensionChange('main', 'cols', Number(e.target.value))} />
                        <Slider label="Item Rows" value={d.main.rows} min={1} max={12} onChange={(e) => handleDimensionChange('main', 'rows', Number(e.target.value))} />
                        <Slider label="Item Column Gap" value={gaps.main.col} min={0} max={5} step={0.25} unit="rem" onChange={(e) => handleGapChange('main', 'col', Number(e.target.value))} />
                        <Slider label="Item Row Gap" value={gaps.main.row} min={0} max={5} step={0.25} unit="rem" onChange={(e) => handleGapChange('main', 'row', Number(e.target.value))} />
                    </ControlSection>
                    
                    <ControlSection title="Footer Layout" disabled={!includeFooter}>
                        <Slider label="Columns" value={d.footer.cols} min={1} max={12} disabled={!includeFooter} onChange={(e) => handleDimensionChange('footer', 'cols', Number(e.target.value))} />
                        <Slider label="Rows" value={d.footer.rows} min={1} max={6} disabled={!includeFooter} onChange={(e) => handleDimensionChange('footer', 'rows', Number(e.target.value))} />
                        <Slider label="Column Gap" value={gaps.footer.col} min={0} max={5} step={0.25} unit="rem" disabled={!includeFooter} onChange={(e) => handleGapChange('footer', 'col', Number(e.target.value))} />
                        <Slider label="Row Gap" value={gaps.footer.row} min={0} max={5} step={0.25} unit="rem" disabled={!includeFooter} onChange={(e) => handleGapChange('footer', 'row', Number(e.target.value))} />
                    </ControlSection>
                    
                    <div className="space-y-6 pt-4 border-t border-gray-700"><CodeBlock language="HTML" code={generatedLayout.htmlCode} onCopy={() => handleCopy('html')} copied={copied === 'html'} /><CodeBlock language="CSS" code={generatedLayout.cssCode} onCopy={() => handleCopy('css')} copied={copied === 'css'} /></div>
                </div>
                <div className="lg:col-span-3 bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-4 flex-shrink-0">Live Preview</h3>
                     <div className="w-full flex-grow min-h-0 bg-gray-900 border border-gray-600 rounded-lg p-4 overflow-auto">
                        <div style={{ display: 'grid', gridTemplateColumns: (sidebarOption !== 'none' ? (sidebarOption === 'left' ? '250px 1fr' : '1fr 250px') : '1fr'), gridTemplateRows: `${includeHeader ? 'auto ' : ''}1fr${includeFooter ? ' auto' : ''}`, gridTemplateAreas: gridTemplateAreasPreview, gap: '1rem', height: '100%'}}>
                           {includeHeader && <div style={{ gridArea: 'header', display: 'grid', gridTemplateColumns: `repeat(${d.header.cols}, 1fr)`, gridTemplateRows: `repeat(${d.header.rows}, auto)`, gap: `${gaps.header.row}rem ${gaps.header.col}rem` }} className="bg-gray-700 border border-gray-800 rounded-lg p-2">
                                {Array.from({ length: d.header.cols * d.header.rows }).map((_, i) => { const key = `header-${i}`; const item = itemContents[key] || getDefaultPropsForType('empty'); return <PreviewItem key={key} itemKey={key} item={item} onTypeChange={handleItemTypeChange} onEdit={setEditingItemKey}><PreviewItemContent item={item} index={i} prefix="H" /></PreviewItem> })}
                           </div>}
                           {sidebarOption !== 'none' && <div style={{ gridArea: 'sidebar', display: 'grid', gridTemplateColumns: `repeat(${d.sidebar.cols}, 1fr)`, gridTemplateRows: `repeat(${d.sidebar.rows}, auto)`, gap: `${gaps.sidebar.row}rem ${gaps.sidebar.col}rem` }} className="bg-gray-700 border border-gray-800 rounded-lg p-2">
                                {Array.from({ length: d.sidebar.cols * d.sidebar.rows }).map((_, i) => { const key = `sidebar-${i}`; const item = itemContents[key] || getDefaultPropsForType('empty'); return <PreviewItem key={key} itemKey={key} item={item} onTypeChange={handleItemTypeChange} onEdit={setEditingItemKey}><PreviewItemContent item={item} index={i} prefix="S" /></PreviewItem> })}
                           </div>}
                           <div style={{ gridArea: 'main', display: 'grid', gridTemplateColumns: `repeat(${d.main.cols}, 1fr)`, gridTemplateRows: `repeat(${d.main.rows}, auto)`, gap: `${gaps.main.row}rem ${gaps.main.col}rem` }} className="bg-gray-700 border border-gray-800 rounded-lg p-2" >
                               {Array.from({ length: d.main.cols * d.main.rows }).map((_, i) => { const key = `main-${i}`; const item = itemContents[key] || getDefaultPropsForType('empty'); return <PreviewItem key={key} itemKey={key} item={item} onTypeChange={handleItemTypeChange} onEdit={setEditingItemKey}><PreviewItemContent item={item} index={i} prefix="Item" /></PreviewItem> })}
                           </div>
                           {includeFooter && <div style={{ gridArea: 'footer', display: 'grid', gridTemplateColumns: `repeat(${d.footer.cols}, 1fr)`, gridTemplateRows: `repeat(${d.footer.rows}, auto)`, gap: `${gaps.footer.row}rem ${gaps.footer.col}rem` }} className="bg-gray-700 border border-gray-800 rounded-lg p-2">
                               {Array.from({ length: d.footer.cols * d.footer.rows }).map((_, i) => { const key = `footer-${i}`; const item = itemContents[key] || getDefaultPropsForType('empty'); return <PreviewItem key={key} itemKey={key} item={item} onTypeChange={handleItemTypeChange} onEdit={setEditingItemKey}><PreviewItemContent item={item} index={i} prefix="F" /></PreviewItem> })}
                           </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HtmlLayoutGenerator;