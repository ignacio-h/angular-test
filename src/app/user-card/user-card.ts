// ng g c user-card 
// o ng generate component user-card

import { Component, Input } from '@angular/core';
import { GithubUser } from '../models/github.models';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  @Input() user: GithubUser | null = null;
}
