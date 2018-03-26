export function updateVText(prevText, nextText, parentDomNode) {
  if (prevText !== nextText) {
    parentDomNode.firstChild.nodeValue = nextText
  }
}