const TARGET_TEXT = "ai mode";
const RESULT_SELECTOR = 'div[jsname][role="listitem"]';
const HIDDEN_ATTRIBUTE = "data-hide-ai-mode";

const isGoogleDomain = /(^|\.)google\.[a-z.]+$/i.test(location.hostname);
if (!isGoogleDomain) {
  return;
}

const style = document.createElement("style");
style.textContent = `
  ${RESULT_SELECTOR}[${HIDDEN_ATTRIBUTE}="true"] {
    display: none !important;
  }
`;
document.documentElement.appendChild(style);

const markParentHidden = (span) => {
  const parentResult = span.closest(RESULT_SELECTOR);
  if (!parentResult || parentResult.getAttribute(HIDDEN_ATTRIBUTE) === "true") {
    return;
  }
  parentResult.setAttribute(HIDDEN_ATTRIBUTE, "true");
};

const inspectNode = (node) => {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  const elements = node.matches("span") ? [node] : node.querySelectorAll("span");
  elements.forEach((span) => {
    if (span.textContent && span.textContent.trim().toLowerCase() === TARGET_TEXT) {
      markParentHidden(span);
    }
  });
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach(inspectNode);
  });
});

observer.observe(document.documentElement, { childList: true, subtree: true });

inspectNode(document.documentElement);

const originalVisibility = document.documentElement.style.visibility;
let visibilityRestored = false;

const restoreVisibility = () => {
  if (visibilityRestored) {
    return;
  }
  visibilityRestored = true;
  requestAnimationFrame(() => {
    if (originalVisibility) {
      document.documentElement.style.visibility = originalVisibility;
    } else {
      document.documentElement.style.removeProperty("visibility");
    }
  });
};

const performInitialScan = () => {
  inspectNode(document.documentElement);
  restoreVisibility();
};

// Temporarily hide page to avoid flicker while initial scan runs
document.documentElement.style.visibility = "hidden";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", performInitialScan, { once: true });
  setTimeout(performInitialScan, 1200);
} else {
  performInitialScan();
}
