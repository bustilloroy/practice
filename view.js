export default class View {

    $ = {}

    constructor() {
        this.$.menu =  document.querySelector('[data-id="menu"]');
        this.$.menuItems =  document.querySelector('[data-id="menu-items"]');
        this.$.resetBtn =  document.querySelector('[data-id="reset-btn"]');
        this.$.newRoundBtn =  document.querySelector('[data-id="new-round-btn"]');
        this.$.squares =  document.querySelectorAll('[data-id="square"]');
        this.$.turn =  document.querySelector('[data-id="turn"]');
        this.$.modal =  document.querySelector('[data-id="modal"]');
        this.$.modalContents =  document.querySelector('[data-id="modal-text"]');
        this.$.modalBtn = document.querySelector('[data-id="modal-btn"]');

        // UI_only event listeners
        this.$.menuItems.addEventListener('click', event => {
            
        });
    }

    bindGameResetEvent(handler) {
        this.$.resetBtn.addEventListener('click', handler);
    }

    bindNewRoundEvent(handler) {
        this.$.newRoundBtn.addEventListener('click', handler);
    } 

    bindPlayerMoveEvent(handler) {
        this.$.squares.forEach(square => {
            square.addEventListener('click', handler);
        })
    }
}