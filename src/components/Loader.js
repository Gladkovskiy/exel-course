import {$} from '../core/dom'

export function loader() {
  return $.create('div', 'loader').html(
    `<div class="lds-default">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>`
  )
}
