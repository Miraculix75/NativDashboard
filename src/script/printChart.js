// printChart.js
function printChart(button) {
    const container = button.closest('.chart-container');
    const printContent = container.outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Print Chart</title></head><body>');
    newWindow.document.write(printContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}
