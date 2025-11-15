# Hide the AI Mode tab in Google Search (Chrome extension)

![hide-ai-tab-in-google-serp](https://github.com/user-attachments/assets/01003739-5c10-47aa-8939-c4867d0c0475)

This simple chromium extension detects any `span` whose text is exactly "AI Mode" and hides the closest parent result container, preventing the AI Mode card from ever showing.


1. Download this repository as a ZIP from GitHub and extract it to a folder.
2. Open Chrome and go to `chrome://extensions`.
3. Enable `Developer mode` (top-right toggle).
4. Click `Load unpacked`.
5. Select the extracted folder.
6. Visit Google Search and verify that any "AI Mode" tab does not appear.
