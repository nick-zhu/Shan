// Creaet a vElement
export function createVElement(tag, config, children) {
  const { className, style } = config;

  return {
    tag,
    style,
    props: {
      children: children
    },
    className,
    dom: null
  }
}