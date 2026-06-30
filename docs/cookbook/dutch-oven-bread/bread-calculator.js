class DutchOvenBreadCalculator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.input = this.shadowRoot.getElementById('bread-loaves');
    this.ovenSizeSelect = this.shadowRoot.getElementById('bread-dutch-oven-size');
    this.output = this.shadowRoot.getElementById('bread-calculator-output');

    if (!this.input || !this.ovenSizeSelect || !this.output) {
      return;
    }

    this.input.addEventListener('input', this);
    this.ovenSizeSelect.addEventListener('change', this);
    this.update();
  }

  disconnectedCallback() {
    if (this.input) {
      this.input.removeEventListener('input', this);
    }
    if (this.ovenSizeSelect) {
      this.ovenSizeSelect.removeEventListener('change', this);
    }
  }

  handleEvent(event) {
    if (event.type === 'input' || event.type === 'change') {
      this.update();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .bread-calculator {
          padding: 1rem;
          border: 1px solid var(--bsa-khaki-light);
          border-radius: 8px;
          background: var(--md-default-bg-color);
          margin: 1rem 0 1.5rem;
        }
        label {
          display: block;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        input, select {
          max-width: 12rem;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--bsa-khaki-light);
          border-radius: 6px;
          background: var(--md-default-bg-color);
          color: inherit;
        }
        .bread-calculator-output,
        .bread-calculator-output { margin-top: 1rem; }
        .bread-calculator-output ul {
          margin-top: 0.5rem;
        }
        .bread-calculator-note {
          font-size: 0.9rem;
          opacity: 0.85;
        }
      </style>
      <div class="bread-calculator">
        <label for="bread-loaves">Number of loaves</label>
        <input id="bread-loaves" type="number" min="1" step="1" value="1" />

        <label for="bread-dutch-oven-size">Dutch oven size</label>
        <select id="bread-dutch-oven-size">
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12" selected>12</option>
          <option value="14">14</option>
        </select>

        <div class="bread-calculator-output" id="bread-calculator-output"></div>
      </div>
    `;
  }

  update() {
    var recipe = {
      flour: 1000,
      water: 670,
      yeastMin: 1,
      yeastMax: 2,
      saltMin: 1,
      saltMax: 2,
      charcoalCharts: {
        8: { 450: { bottom: 6, top: 14 }, 425: { bottom: 6, top: 13 }, 400: { bottom: 6, top: 12 }, 375: { bottom: 6, top: 11 }, 350: { bottom: 5, top: 11 }, 325: { bottom: 5, top: 10 } },
        10: { 450: { bottom: 10, top: 19 }, 425: { bottom: 9, top: 18 }, 400: { bottom: 8, top: 17 }, 375: { bottom: 7, top: 16 }, 350: { bottom: 7, top: 14 }, 325: { bottom: 6, top: 13 } },
        12: { 450: { bottom: 11, top: 22 }, 425: { bottom: 10, top: 21 }, 400: { bottom: 10, top: 19 }, 375: { bottom: 9, top: 18 }, 350: { bottom: 8, top: 17 }, 325: { bottom: 7, top: 16 } },
        14: { 450: { bottom: 14, top: 26 }, 425: { bottom: 13, top: 25 }, 400: { bottom: 12, top: 24 }, 375: { bottom: 12, top: 22 }, 350: { bottom: 11, top: 21 }, 325: { bottom: 10, top: 20 } }
      }
    };

    var loaves = Math.max(1, parseInt(this.input.value, 10) || 1);
    var size = parseInt(this.ovenSizeSelect.value, 10) || 12;
    var charcoal = recipe.charcoalCharts[size] || recipe.charcoalCharts[12];
    var targetBake = charcoal[375];
    var hotStart = charcoal[450];

    function charcoalBlock(label, values) {
      var total = values.bottom + values.top;

      return [
        '<li><strong>' + label + ':</strong> about ' + total + ' briquettes',
        '<ul>',
        '<li>Top: ' + values.top + '</li>',
        '<li>Bottom: ' + values.bottom + '</li>',
        '</ul>',
        '</li>'
      ].join('');
    }

    this.output.innerHTML = [
      '<p><strong>Total ingredients for ' + loaves + ' loaf' + (loaves === 1 ? '' : 's') + ':</strong></p>',
      '<ul>',
      '<li>Flour: ' + Math.round(recipe.flour * loaves) + ' g</li>',
      '<li>Water: ' + Math.round(recipe.water * loaves) + ' g</li>',
      '<li>Yeast: ' + (recipe.yeastMin * loaves) + '-' + (recipe.yeastMax * loaves) + ' tbsp</li>',
      '<li>Salt: ' + (recipe.saltMin * loaves) + '-' + (recipe.saltMax * loaves) + ' tbsp</li>',
      '</ul>',
      '<ul>',
      charcoalBlock('Start hot (450 F)', hotStart),
      charcoalBlock('Target bake (375 F)', targetBake),
      '</ul>',
    ].join('');
  }
}

customElements.define('dutch-oven-bread-calculator', DutchOvenBreadCalculator);
