import {Component} from "@angular/core";
import {CommonModule, NgFor} from "@angular/common";
import {RouterLink} from "@angular/router";
import {RemoveDashesPipe} from "../pipes/remove-dashes-pipe";
import {YellowDirective} from "../directives/yellow.directive";

// 1 задание

const func = (value: string) => {return value}

const aboutCompany: string = 'О компании';

const vuzov = func(aboutCompany);

// 4 задание

const secondMenuItem = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

const upperCaseSecondMenuItem = secondMenuItem.map (
  (item) => {
    return item.toUpperCase();
  }
)

console.log(upperCaseSecondMenuItem);


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule, RemoveDashesPipe, YellowDirective],
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  readonly headerItem1 = 'Главная';

  readonly aboutCompany = vuzov;

  readonly headerItem3 = 'Каталог';

  secondMenuItem : string[] = upperCaseSecondMenuItem;

  isUpperCase : boolean = true;

  public changeMenuText() : void {
    this.secondMenuItem = upperCaseSecondMenuItem.map(
      item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )
    this.isUpperCase = !this.isUpperCase
  }

  today: number = Date.now();

}
