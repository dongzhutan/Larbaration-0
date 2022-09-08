/**
 * The show word web component module.
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
      margin: 200px auto;
      background-color: lightseagreen;
      padding: 20px;
      overflow: hidden;
    
    }

    h1 {
      color: yellow;
      text-align: center;
    }

    .content {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    #show {
      margin: 10px auto;
      background-color: white;
      padding: 100px;
      font-size:2em;
    }

  </style>

  <div class="content" >
      <h1>Translate:</h1>
      <ul id ="show"></ul>
      </input>
      <button id="button">come back</button>
  </div>
`
customElements.define('show-word',

  /**
   * Represents a show word element.
   */
  class extends HTMLElement {
    /**
     * The button under the input box.
     */
    #enterButton

    /**
     * The html id of the dom.
     */
    #show

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
      this.#enterButton = this.shadowRoot.querySelector('#button')
      this.#show = this.shadowRoot.querySelector('#show')
    }

    /**
     * Insert an new element to the dom.
     *
     * @returns {string} The new element.
     */
    static get observedAttributes () {
      return ['theword']
    }

    /**
     * Represent the change word of the event detail.
     *
     * @param {string} eventDetail The events value.
     * @param {string} oldValue Old value.
     * @param {string} newValue Current value.
     */
    attributeChangedCallback (eventDetail, oldValue, newValue) {
      this.printOutWord(newValue)
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#enterButton.addEventListener('click', (event) => {
        this.#enterButton.click()
      })

      this.#enterButton.addEventListener('click', (event) => {
        this.#playAgain(event)
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#enterButton.removeEventListener('click', () => {
      })
      this.#playAgain()
    }

    /**
     *Print out the translate value.
     *
     * @param {string} newValue The current choosen english word to translate.
     */
    printOutWord (newValue) {
      const translateWord = []
      translateWord.push(newValue)

      for (let i = 0; i < translateWord.length; i++) {
        const insert = document.createDocumentFragment()
        const li = document.createElement('li')
        if (newValue === 'Hello!') {
          li.innerHTML = newValue + ' - 你好!(nǐ hǎo)'
        } else if (newValue === 'Thank you!') {
          li.innerHTML = newValue + ' - 谢谢!(xiè xiè)'
        } else if (newValue === 'Goodbye!') {
          li.innerHTML = newValue + ' - 再见!(zài jiàn)'
        } else if (newValue === 'What is your name?') {
          li.innerHTML = newValue + ' - 你叫什么名字？(nǐ jiào shén me míng zì?)'
        }
        insert.appendChild(li)
        this.#show.appendChild(insert)
      }
    }

    /**
     * Sent the current play again event from this class.
     *
     */
    async #playAgain () {
      this.dispatchEvent(new window.CustomEvent('play-again', { bubbles: true, detail: this.#enterButton.value }))
    }
  }
)
