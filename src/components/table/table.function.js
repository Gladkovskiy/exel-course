/**
 *
 * @param {MouseEvent} event
 * @return {*}
 */
export function shouldResize(event) {
  return event.target.dataset.resize
}
