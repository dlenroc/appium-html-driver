import { INSTRUMENTATION_HANDLE, INSTRUMENTATION_UDID } from './helpers/instrumentation';

// Create the iframe to isolate styles
const iframe = document.createElement('iframe');
iframe.style.position = 'fixed';
iframe.style.top = '5%';
iframe.style.right = '5%';
iframe.style.zIndex = '9999';
iframe.style.pointerEvents = 'none';
iframe.style.border = 'none';
iframe.style.width = '300px';
iframe.style.height = 'auto';

// Append the iframe to the body
document.documentElement.appendChild(iframe);

// Access the iframe's document
const iframeDoc = iframe.contentDocument || iframe.contentWindow!.document;
iframeDoc.open();
iframeDoc.close();

// Reset iframe's styles for isolation
iframeDoc.body.style.margin = '0';
iframeDoc.body.style.padding = '0';
iframeDoc.body.style.backgroundColor = 'transparent';
iframeDoc.body.style.overflow = 'hidden';

// Apply global styles for consistent text appearance
iframeDoc.body.style.fontFamily = 'Arial, sans-serif';
iframeDoc.body.style.fontSize = '0.9rem';
iframeDoc.body.style.textAlign = 'center';
iframeDoc.body.style.color = '#fff';
iframeDoc.body.style.wordBreak = 'break-all';

// Create the panel element inside the iframe
const panel = iframeDoc.createElement('div');
panel.style.backgroundColor = 'rgba(30, 30, 30, 0.9)';
panel.style.border = '1px solid #333';
panel.style.borderRadius = '5px';
panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';

// Create the header
const header = iframeDoc.createElement('div');
header.textContent = '@dlenroc/appium-html-driver';
header.style.backgroundColor = '#212121';
header.style.padding = '8px 12px';
header.style.fontWeight = 'bold';
header.style.borderBottom = '1px solid #333';

// Create the content area
const content = iframeDoc.createElement('div');
content.style.padding = '10px';

// Add content elements
const udidElement = iframeDoc.createElement('p');
udidElement.textContent = INSTRUMENTATION_UDID;
udidElement.style.margin = '4px 0';
udidElement.style.color = '#9ccc65';

const handleElement = iframeDoc.createElement('p');
handleElement.textContent = INSTRUMENTATION_HANDLE;
handleElement.style.margin = '4px 0';
handleElement.style.color = '#29b6f6';

const statusElement = iframeDoc.createElement('p');
statusElement.textContent = 'Connecting...';
statusElement.style.color = '#ff9800';
statusElement.style.margin = '4px 0';

// Append elements to the content area
content.appendChild(udidElement);
content.appendChild(handleElement);
content.appendChild(statusElement);

// Assemble the panel
panel.appendChild(header);
panel.appendChild(content);

// Append panel to iframe's body
iframeDoc.body.appendChild(panel);

export function updateStatusText(status: string) {
  statusElement.textContent = status;
}
