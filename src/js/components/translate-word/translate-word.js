/**
 * The exchange-word web component module.
 *
 * @author Dongzhu Tan <dt222ha@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
  .container {
    position: relative;
    width: 500px;
    max-width:400px;
    margin: 50px auto;
    background-color: lightseagreen;
    padding: 10px;
    overflow: hidden;
  
  }

  #list {
    width: 200px;
    border: 15px read;
    padding: 10px;
    margin: 10px;
  }

</style>

<div class="box">
  <div class="container">
    <div class="translate-word"/>
     <chose-word><chose-word>
  </div>
</div>
`

customElements.define('translate-word',

  /**
   * Represents a translate-word element.
   */
  class extends HTMLElement {
    /**
     * The root of the translate word dom.
     */
    #translateWord

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#translateWord = this.shadowRoot.querySelector('.translate-word')
    }

    /**
     * Called after the element is inserted into the DOM. Listen different event from different class and run the corresponding function.
     */
    connectedCallback () {
      this.#translateWord.addEventListener('enter-word', (event) => {
        this.cleanComponent()
        const word = this.#translateWord.appendChild(document.createElement('show-word'))
        word.setAttribute('theword', event.detail)
      })

      this.#translateWord.addEventListener('play-again', () => {
        this.cleanComponent()
        this.#translateWord.appendChild(document.createElement('chose-word')) // Insert the chose word component when play again has been called.
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#translateWord.removeEventListener('chose-word', () => {
      })
      this.#translateWord.removeEventListener('show-word', () => {
      })
    }

    /**
     * Removed the old childs from quiz-application.
     */
    cleanComponent () {
      while (this.#translateWord.firstChild) {
        this.#translateWord.removeChild(this.#translateWord.firstChild)
      }
    }
  }
)
