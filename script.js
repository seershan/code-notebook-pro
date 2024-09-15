document.addEventListener('DOMContentLoaded', () => {
    const htmlEditor = ace.edit("html-editor");
    const cssEditor = ace.edit("css-editor");
    const jsEditor = ace.edit("js-editor");
    const runBtn = document.getElementById('run-btn');
    const saveBtn = document.getElementById('save-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const outputFrame = document.getElementById('output-frame');

    // Configure Ace editors
    const editors = [htmlEditor, cssEditor, jsEditor];
    editors.forEach((editor, index) => {
        const modes = ['html', 'css', 'javascript'];
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode(`ace/mode/${modes[index]}`);
        editor.setShowPrintMargin(false);
        editor.setOptions({
            fontSize: "14px",
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });
    });

    // Set initial content
    htmlEditor.setValue('<h1>Welcome to Code Notebook Pro!</h1>');
    cssEditor.setValue('h1 { color: #3a86ff; text-align: center; }');
    jsEditor.setValue('console.log("Happy coding!");');

    // Run button functionality
    runBtn.addEventListener('click', () => {
        const html = htmlEditor.getValue();
        const css = cssEditor.getValue();
        const js = jsEditor.getValue();

        const output = `
            <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>
                    ${html}
                    <script>${js}</script>
                </body>
            </html>
        `;

        outputFrame.srcdoc = output;
    });

    // Save button functionality
    saveBtn.addEventListener('click', () => {
        const html = htmlEditor.getValue();
        const css = cssEditor.getValue();
        const js = jsEditor.getValue();

        const saveFile = (content, fileName) => {
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, fileName);
        };

        saveFile(html, 'index.html');
        saveFile(css, 'styles.css');
        saveFile(js, 'script.js');
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        editors.forEach(editor => {
            editor.setTheme(editor.getTheme() === "ace/theme/monokai" ? "ace/theme/solarized_light" : "ace/theme/monokai");
        });
    });

    // Add animations
    const animateButton = (button) => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 0.5s infinite';
        });

        button.addEventListener('mouseleave', () => {
            button.style.animation = 'none';
        });
    };

    animateButton(runBtn);
    animateButton(saveBtn);
    animateButton(themeToggle);
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);