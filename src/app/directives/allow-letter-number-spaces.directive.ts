import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowLetterNumberSpaces]',
  standalone: true
})
export class AllowLetterNumberSpacesDirective {

  private regex: RegExp = new RegExp(/^[a-zA-Z0-9 ]*$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el:ElementRef) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent){
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Verificar si la entrada es válida
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (!String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
