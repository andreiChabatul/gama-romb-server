import { Component, Input } from '@angular/core';
import { ButtonControllerService } from '../../services/button-controller.service';
import { Button } from 'src/app/types/components';


@Component({
  selector: 'app-button-materials',
  templateUrl: './button-materials.component.html',
  styleUrls: ['./button-materials.component.scss']
})
export class ButtonMaterialsComponent {

  @Input() option: Button;

  constructor(private readonly buttonControllerService: ButtonControllerService) { }

  handlingClick() {
    this.buttonControllerService.actionButton(this.option.action);
  }

}
