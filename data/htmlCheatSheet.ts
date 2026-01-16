export interface CheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Document Structure' | 'Metadata' | 'Sectioning' | 'Text Content' | 'Inline Text' | 'Media' | 'Forms' | 'Tables' | 'Interactive' | 'Scripting';
}

export const allHtmlTags: CheatSheetItem[] = [
  // Document Structure
  { name: '<html>', description: 'The root element of an HTML page.', example: '<html>...</html>', category: 'Document Structure' },
  { name: '<body>', description: 'Defines the document\'s body, which contains all the visible contents.', example: '<body><h1>My First Heading</h1><p>My first paragraph.</p></body>', category: 'Document Structure' },

  // Metadata
  { name: '<head>', description: 'Contains machine-readable information (metadata) about the document.', example: '<head><title>My Page</title></head>', category: 'Metadata' },
  { name: '<title>', description: 'Specifies a title for the HTML page (which is shown in the browser\'s title bar or in the page\'s tab).', example: '<title>HTML5 Tutorial</title>', category: 'Metadata' },
  { name: '<meta>', description: 'Provides metadata about the HTML document. Will not be displayed on the page.', example: '<meta charset="UTF-8">', category: 'Metadata' },
  { name: '<link>', description: 'Defines the relationship between the current document and an external resource (most often used to link to style sheets).', example: '<link rel="stylesheet" href="mystyle.css">', category: 'Metadata' },
  { name: '<style>', description: 'Used to embed CSS style information for a document.', example: '<style>body { background-color: lightblue; }</style>', category: 'Metadata' },
  { name: '<base>', description: 'Specifies the base URL/target for all relative URLs in a document.', example: '<base href="https://www.w3schools.com/" target="_blank">', category: 'Metadata' },

  // Sectioning
  { name: '<header>', description: 'Represents introductory content, typically a group of introductory or navigational aids.', example: '<header><h1>Website Title</h1></header>', category: 'Sectioning' },
  { name: '<footer>', description: 'Represents a footer for its nearest sectioning content or the whole page.', example: '<footer><p>&copy; 2024</p></footer>', category: 'Sectioning' },
  { name: '<nav>', description: 'Defines a set of navigation links.', example: '<nav><a href="/home">Home</a><a href="/about">About</a></nav>', category: 'Sectioning' },
  { name: '<main>', description: 'Specifies the main content of a document. There should only be one <main> element per document.', example: '<main><p>The main content...</p></main>', category: 'Sectioning' },
  { name: '<article>', description: 'Specifies independent, self-contained content (e.g., a blog post).', example: '<article><h2>Article Title</h2><p>...</p></article>', category: 'Sectioning' },
  { name: '<section>', description: 'Defines a section in a document.', example: '<section><h3>About Us</h3><p>...</p></section>', category: 'Sectioning' },
  { name: '<aside>', description: 'Defines some content aside from the content it is placed in (like a sidebar).', example: '<aside><h4>Related Links</h4><ul>...</ul></aside>', category: 'Sectioning' },
  { name: '<h1> to <h6>', description: 'Heading tags, used to define headings. <h1> is the most important, <h6> is the least.', example: '<h1>Main Title</h1><h2>Subtitle</h2>', category: 'Sectioning' },
  
  // Text Content
  { name: '<p>', description: 'Defines a paragraph.', example: '<p>This is a paragraph.</p>', category: 'Text Content' },
  { name: '<div>', description: 'A generic container used to group other elements for styling.', example: '<div class="container"><p>Content.</p></div>', category: 'Text Content' },
  { name: '<ul>', description: 'Defines an unordered (bulleted) list.', example: '<ul><li>Item 1</li><li>Item 2</li></ul>', category: 'Text Content' },
  { name: '<ol>', description: 'Defines an ordered (numbered) list.', example: '<ol><li>First</li><li>Second</li></ol>', category: 'Text Content' },
  { name: '<li>', description: 'Defines a list item.', example: '<li>List item</li>', category: 'Text Content' },
  { name: '<hr>', description: 'Represents a thematic break between paragraph-level elements (e.g., a horizontal rule).', example: '<p>Section 1</p><hr><p>Section 2</p>', category: 'Text Content' },
  { name: '<blockquote>', description: 'Defines a section that is quoted from another source.', example: '<blockquote><p>Quoted text...</p></blockquote>', category: 'Text Content' },
  { name: '<pre>', description: 'Defines preformatted text, preserving spaces and line breaks.', example: '<pre><code>function hello() {\n  return "world";\n}</code></pre>', category: 'Text Content' },
  { name: '<dl>', description: 'Defines a description list.', example: '<dl><dt>Coffee</dt><dd>- black hot drink</dd></dl>', category: 'Text Content' },
  { name: '<dt>', description: 'Defines a term/name in a description list.', example: '<dt>Coffee</dt>', category: 'Text Content' },
  { name: '<dd>', description: 'Defines a description of a term in a description list.', example: '<dd>- black hot drink</dd>', category: 'Text Content' },

  // Inline Text
  { name: '<a>', description: 'Defines a hyperlink.', example: '<a href="https://example.com">Visit Example</a>', category: 'Inline Text' },
  { name: '<span>', description: 'A generic inline container for phrasing content.', example: '<p>My mother has <span style="color:blue">blue</span> eyes.</p>', category: 'Inline Text' },
  { name: '<strong>', description: 'Defines text with strong importance. The content is typically displayed in bold.', example: '<strong>Important!</strong>', category: 'Inline Text' },
  { name: '<em>', description: 'Defines emphasized text. The content is typically displayed in italic.', example: 'This is <em>emphasized</em> text.', category: 'Inline Text' },
  { name: '<code>', description: 'Defines a piece of computer code.', example: '<code>const x = 5;</code>', category: 'Inline Text' },
  { name: '<br>', description: 'Inserts a single line break.', example: 'First line.<br>Second line.', category: 'Inline Text' },
  { name: '<b>', description: 'Defines bold text, without any extra importance.', example: '<b>Bold text</b>', category: 'Inline Text' },
  { name: '<i>', description: 'Defines a part of text in an alternate voice or mood, displayed in italic.', example: '<i>He said.</i>', category: 'Inline Text' },
  { name: '<u>', description: 'Defines text that should be stylistically different from normal text, such as a misspelled word.', example: '<u>Underlined text</u>', category: 'Inline Text' },
  { name: '<mark>', description: 'Defines marked or highlighted text.', example: 'Do not forget to buy <mark>milk</mark> today.', category: 'Inline Text' },
  { name: '<small>', description: 'Defines smaller text (like copyright and other side-comments).', example: '<small>Copyright 2024</small>', category: 'Inline Text' },
  { name: '<sub>', description: 'Defines subscripted text.', example: 'H<sub>2</sub>O', category: 'Inline Text' },
  { name: '<sup>', description: 'Defines superscripted text.', example: 'E=MC<sup>2</sup>', category: 'Inline Text' },
  { name: '<time>', description: 'Defines a specific time (or datetime).', example: '<time datetime="2024-01-01">New Year\'s Day</time>', category: 'Inline Text' },
  { name: '<q>', description: 'Defines a short inline quotation.', example: '<p>He said, <q>Hello world</q>.</p>', category: 'Inline Text' },
  
  // Media
  { name: '<img>', description: 'Embeds an image in an HTML page.', example: '<img src="image.jpg" alt="Description">', category: 'Media' },
  { name: '<audio>', description: 'Embeds sound content in a document.', example: '<audio controls><source src="horse.ogg" type="audio/ogg"></audio>', category: 'Media' },
  { name: '<video>', description: 'Embeds video content in a document.', example: '<video width="320" height="240" controls><source src="movie.mp4" type="video/mp4"></video>', category: 'Media' },
  { name: '<source>', description: 'Defines multiple media resources for <video>, <audio>, and <picture>.', example: '<source src="movie.mp4" type="video/mp4">', category: 'Media' },
  { name: '<figure>', description: 'Specifies self-contained content, like illustrations, diagrams, photos, code listings, etc.', example: '<figure><img src="pic.jpg"><figcaption>Fig.1</figcaption></figure>', category: 'Media' },
  { name: '<figcaption>', description: 'Defines a caption for a <figure> element.', example: '<figcaption>Figure 1: A caption.</figcaption>', category: 'Media' },
  { name: '<track>', description: 'Defines text tracks for media elements (<video> and <audio>).', example: '<track kind="subtitles" src="subtitles_en.vtt" srclang="en">', category: 'Media' },
  
  // Forms
  { name: '<form>', description: 'Defines an HTML form for user input.', example: '<form action="/submit"><input type="text"></form>', category: 'Forms' },
  { name: '<input>', description: 'Defines an input control. Type can be text, password, checkbox, radio, submit, etc.', example: '<input type="text" id="name" name="name">', category: 'Forms' },
  { name: '<label>', description: 'Defines a label for an <input> element.', example: '<label for="name">Name:</label>', category: 'Forms' },
  { name: '<textarea>', description: 'Defines a multi-line input control (a text area).', example: '<textarea id="msg" name="msg"></textarea>', category: 'Forms' },
  { name: '<button>', description: 'Defines a clickable button.', example: '<button type="button">Click Me</button>', category: 'Forms' },
  { name: '<select>', description: 'Defines a drop-down list.', example: '<select name="cars"><option value="volvo">Volvo</option></select>', category: 'Forms' },
  { name: '<option>', description: 'Defines an option in a drop-down list.', example: '<option value="fiat">Fiat</option>', category: 'Forms' },
  { name: '<fieldset>', description: 'Groups related elements in a form.', example: '<fieldset><legend>Info</legend>...</fieldset>', category: 'Forms' },
  { name: '<legend>', description: 'Defines a caption for a <fieldset> element.', example: '<legend>Personal Information</legend>', category: 'Forms' },
  
  // Tables
  { name: '<table>', description: 'Defines a table.', example: '<table><tr><td>Cell</td></tr></table>', category: 'Tables' },
  { name: '<tr>', description: 'Defines a row in a table.', example: '<tr><td>Cell 1</td><td>Cell 2</td></tr>', category: 'Tables' },
  { name: '<td>', description: 'Defines a standard data cell in a table.', example: '<td>Cell content</td>', category: 'Tables' },
  { name: '<th>', description: 'Defines a header cell in a table.', example: '<th>Header</th>', category: 'Tables' },
  { name: '<thead>', description: 'Groups the header content in a table.', example: '<thead><tr><th>Month</th></tr></thead>', category: 'Tables' },
  { name: '<tbody>', description: 'Groups the body content in a table.', example: '<tbody><tr><td>January</td></tr></tbody>', category: 'Tables' },
  { name: '<tfoot>', description: 'Groups the footer content in a table.', example: '<tfoot><tr><td>Sum</td></tr></tfoot>', category: 'Tables' },
  { name: '<caption>', description: 'Defines a table caption.', example: '<caption>Monthly savings</caption>', category: 'Tables' },
  
  // Interactive
  { name: '<details>', description: 'Defines additional details that the user can view or hide.', example: '<details><summary>Copyright</summary><p>...</p></details>', category: 'Interactive' },
  { name: '<summary>', description: 'Defines a visible heading for a <details> element.', example: '<summary>Show details</summary>', category: 'Interactive' },
  { name: '<dialog>', description: 'Defines a dialog box or window.', example: '<dialog open>This is an open dialog.</dialog>', category: 'Interactive' },
  
  // Scripting
  { name: '<script>', description: 'Used to embed a client-side script (JavaScript).', example: '<script>document.getElementById("demo").innerHTML = "Hello";</script>', category: 'Scripting' },
  { name: '<noscript>', description: 'Defines an alternate content for users that have disabled scripts in their browser.', example: '<noscript>Sorry, your browser does not support JavaScript!</noscript>', category: 'Scripting' },
  { name: '<canvas>', description: 'Used to draw graphics on a web page via JavaScript.', example: '<canvas id="myCanvas" width="200" height="100"></canvas>', category: 'Scripting' },
];

export const commonAttributes: CheatSheetItem[] = [
  // --- Core Global Attributes ---
  { name: 'id', description: 'Specifies a unique identifier for an element.', example: '<div id="main-content"></div>', category: 'Document Structure' },
  { name: 'class', description: 'Specifies one or more space-separated class names for an element, used for styling and scripting.', example: '<p class="text-bold featured"></p>', category: 'Document Structure' },
  { name: 'style', description: 'Applies inline CSS styles to an element. It should be a string of CSS declarations.', example: '<p style="color: blue; font-size: 16px;">Blue text</p>', category: 'Document Structure' },
  { name: 'title', description: 'Specifies extra information about an element, shown as a tooltip.', example: '<button title="Click to save">Save</button>', category: 'Document Structure' },
  { name: 'lang', description: 'Specifies the language of the element\'s content using a language code. Examples: `en`, `en-US`, `es`, `fr`.', example: '<p lang="es">Hola, Mundo!</p>', category: 'Document Structure' },
  { name: 'data-*', description: 'Custom data attributes used to store private data for scripts. The name must not contain uppercase letters and must be at least one character long after the prefix "data-".', example: '<div data-user-id="123" data-role="admin"></div>', category: 'Document Structure' },
  
  // --- Accessibility & Interaction ---
  { name: 'accesskey', description: 'Provides a hint for generating a keyboard shortcut for the current element. The value should be a single character.', example: '<a href="/home" accesskey="h">Home</a>', category: 'Document Structure' },
  { name: 'contenteditable', description: 'Indicates if the element\'s content is editable by the user. Possible values: `true`, `false`.', example: '<p contenteditable="true">You can edit this.</p>', category: 'Document Structure' },
  { name: 'dir', description: 'Specifies the text direction for the content. Possible values: `ltr` (left-to-right), `rtl` (right-to-left), `auto`.', example: '<p dir="rtl">טקסט מימין לשמאל</p>', category: 'Document Structure' },
  { name: 'draggable', description: 'Indicates that the element can be dragged. Possible values: `true`, `false`, `auto` (browser default).', example: '<img src="logo.png" draggable="true">', category: 'Document Structure' },
  { name: 'hidden', description: 'A boolean attribute indicating that the element is not yet, or is no longer, relevant. Its presence means true.', example: '<p hidden>This paragraph is not visible.</p>', category: 'Document Structure' },
  { name: 'inert', description: 'A boolean attribute that makes the browser ignore user input events for the element, including focus and assistive technology events.', example: '<div inert>This section is inactive.</div>', category: 'Document Structure' },
  { name: 'role', description: 'Defines the role of an element for assistive technologies (ARIA). Common examples: `button`, `navigation`, `main`, `alert`.', example: '<div role="button" tabindex="0">Click Me</div>', category: 'Document Structure' },
  { name: 'tabindex', description: 'Indicates if an element can be focused. `-1`: focusable via script, but not in tab order. `0`: focusable and in tab order. Positive integer: defines an explicit tab order.', example: '<div tabindex="0">This div is focusable.</div>', category: 'Document Structure' },

  // --- Input & Form Behavior ---
  { name: 'autocapitalize', description: 'Controls how text input is automatically capitalized on virtual keyboards. Values: `off`/`none`, `on`/`sentences`, `words`, `characters`.', example: '<input type="text" autocapitalize="words">', category: 'Document Structure' },
  { name: 'autofocus', description: 'A boolean attribute specifying that an element should be focused on page load. Its presence means true.', example: '<input type="text" autofocus>', category: 'Document Structure' },
  { name: 'enterkeyhint', description: 'Specifies the appearance of the "Enter" key on virtual keyboards. Values: `enter`, `done`, `go`, `next`, `previous`, `search`, `send`.', example: '<input type="search" enterkeyhint="search">', category: 'Document Structure' },
  { name: 'inputmode', description: 'Provides a hint for which virtual keyboard to display. Values: `none`, `text`, `decimal`, `numeric`, `tel`, `search`, `email`, `url`.', example: '<input type="text" inputmode="numeric">', category: 'Document Structure' },
  { name: 'spellcheck', description: 'Indicates if the element is to have its spelling and grammar checked. Possible values: `true`, `false`.', example: '<textarea spellcheck="true"></textarea>', category: 'Document Structure' },
  
  // --- Scripting & Advanced ---
  { name: 'on*', description: 'Event handler attributes (e.g., `onclick`, `onmouseover`) that execute a script when an event occurs.', example: '<button onclick="alert(\'Clicked!\')">Click Me</button>', category: 'Document Structure' },
  { name: 'nonce', description: 'A cryptographic nonce ("number used once") used by Content Security Policy to allow specific inline scripts.', example: '<script nonce="random-string-123"></script>', category: 'Document Structure' },
  { name: 'translate', description: 'Specifies whether the element\'s content should be translated when the page is localized. Possible values: `yes`, `no`.', example: '<span translate="no">SKU-12345</span>', category: 'Document Structure' },

  // --- Common Element-Specific Attributes (for reference) ---
  { name: 'href', description: 'Specifies the URL of the page the link goes to. (For <a>, <link>, <area>, <base>)', example: '<a href="/about">About Us</a>', category: 'Document Structure' },
  { name: 'src', description: 'Specifies the URL of an external resource. (For <img>, <script>, <iframe>, <audio>, <video>)', example: '<img src="/images/logo.png" alt="Logo">', category: 'Document Structure' },
  { name: 'alt', description: 'Specifies alternative text for an image. Crucial for accessibility. (For <img>, <area>, <input type="image">)', example: '<img src="logo.png" alt="Our company logo">', category: 'Document Structure' },
  { name: 'disabled', description: 'A boolean attribute indicating that the user cannot interact with the element. Its presence means true. (For form elements)', example: '<input type="text" disabled>', category: 'Document Structure' },
  { name: 'placeholder', description: 'Provides a hint to the user of what can be entered in an input field. (For <input>, <textarea>)', example: '<input type="email" placeholder="you@example.com">', category: 'Document Structure' },
  { name: 'target', description: 'Specifies where to open the linked document. Values: `_self` (default), `_blank` (new tab), `_parent`, `_top`. (For <a>, <form>)', example: '<a href="https://example.com" target="_blank">Open in new tab</a>', category: 'Document Structure' },
  { name: 'rel', description: 'Specifies the relationship between the current document and the linked document. Common values: `stylesheet`, `icon`, `nofollow`, `noopener`, `noreferrer`. (For <a>, <link>)', example: '<link rel="stylesheet" href="style.css">', category: 'Document Structure' },
  { name: 'for', description: 'Links a <label> to a form control by its `id`. (For <label>, <output>)', example: '<label for="username">Username:</label>\n<input type="text" id="username">', category: 'Document Structure' },
  { name: 'type', description: `Specifies the type of the element, which drastically changes its behavior. The available options depend on the element:\n- For <input>: \`text\`, \`password\`, \`submit\`, \`button\`, \`reset\`, \`radio\`, \`checkbox\`, \`file\`, \`hidden\`, \`image\`, \`color\`, \`date\`, \`datetime-local\`, \`email\`, \`month\`, \`number\`, \`range\`, \`search\`, \`tel\`, \`time\`, \`url\`, \`week\`.\n- For <button>: \`submit\` (default), \`reset\`, \`button\`.\n- For <ol>: \`1\` (default), \`a\`, \`A\`, \`i\`, \`I\`.\n- For <script>: \`text/javascript\` (default), \`module\`, \`importmap\`.\n- For <link>, <style>, <embed>: Specifies the MIME type (e.g., \`text/css\`).`, example: '<input type="password" name="pass">', category: 'Document Structure' },
  { name: 'value', description: 'Specifies the initial value of a form control. (For <input>, <button>, <option>, etc.)', example: '<input type="text" value="Initial text">', category: 'Document Structure' },
  { name: 'name', description: 'The name of a form control, submitted with the form data. (For most form elements)', example: '<input type="text" name="first_name">', category: 'Document Structure' },
  { name: 'action', description: 'The URL that processes the form submission. (For <form>)', example: '<form action="/login" method="post">...</form>', category: 'Document Structure' },
  { name: 'method', description: 'The HTTP method to submit the form with. Values: `get`, `post`, `dialog`. (For <form>)', example: '<form action="/search" method="get">...</form>', category: 'Document Structure' },
  { name: 'width / height', description: 'Specifies the dimensions of an element like an image, canvas, or video. The value is in pixels.', example: '<img src="photo.jpg" width="300" height="200">', category: 'Document Structure' },
  { name: 'controls', description: 'A boolean attribute that displays media controls (play, pause, volume) for <audio> and <video>. Its presence means true.', example: '<video src="movie.mp4" controls></video>', category: 'Document Structure' },
];