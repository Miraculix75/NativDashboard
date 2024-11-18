function copyToClipboard(button) {
    const container = button.closest('.chart-container');
    const canvas = container.querySelector('canvas');
    
    if (canvas) {
        canvas.toBlob(blob => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]);
            alert("Chart copied to clipboard!");
        });
    } else {
        alert("No chart to copy.");
    }
}
