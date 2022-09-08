/**
 * The chose word web component module.
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
      width: auto;
      margin: 100px auto;
      background-color: lightseagreen;
      padding: 10px;
      overflow: hidden;
    
    }

    h1 {
      color: yellow;
      text-align: center;
    }

    .box {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    #chose {
      height: 25px;
      background: #fff;
      border: 1px solid transparent;
      box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
      border-radius: 24px;
      width: 200px;
      text-align: center;
      margin-bottom: 20px;
    }


  </style>

  <div class="box">
      <h1>Feel free to choose a word here:</h1>
      <input type="text" id="chose" autofocus list="wordList">
        <datalist id="wordList">
            <option>Hello!</option>
            <option>Thank you!</option>
            <option>Goodbye!</option>
            <option>What is your name?</option>
        </datalist>
      <button id="button">Submit</button>
  </div>
`
customElements.define('chose-word',

  /**
   * Represents a chose word element.
   */
  class extends HTMLElement {
    /**
     * The users input word.
     */
    #inputWord

    /**
     * The input place where you enter the word.
     */
    #choseWord

    /**
     * The button under the input box to submit the word.
     */
    #enterButton

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the bulletin board element in the shadow root.
      this.#inputWord = this.shadowRoot.querySelector('input')
      this.#choseWord = this.shadowRoot.querySelector('#button')
      this.#enterButton = this.shadowRoot.querySelector('#chose')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#enterButton.addEventListener('keyup', (event) => {
        event.preventDefault()
        if (event.keyCode === 13) {
          this.#choseWord.click()
        }
      })

      this.#choseWord.addEventListener('click', (event) => {
        this.#sendWord(event)
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#choseWord.removeEventListener('click', () => {
        this.#sendWord()
      })
    }

    /**
     * Sent the enter word event from this class.
     *
     */
    async #sendWord () {
      this.dispatchEvent(new window.CustomEvent('enter-word', { bubbles: true, detail: this.#inputWord.value }))
    }
  }
)
