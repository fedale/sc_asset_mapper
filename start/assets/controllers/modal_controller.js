import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['dialog'];

  open() {
    this.dialogTarget.showModal();
    document.body.classList.add('overflow-hidden');
  }

  close() {
    if (this.hasDialogTarget) {
        this.dialogTarget.close();
    }

    document.body.classList.remove('overflow-hidden');
  }

  clickOutside(event) {
    if (event.target === this.dialogTarget) {
        this.dialogTarget.close();
    }
  }

}