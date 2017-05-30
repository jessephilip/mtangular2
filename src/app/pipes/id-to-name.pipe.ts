import { Pipe, PipeTransform } from '@angular/core';
import { PlayerService } from 'app/services/player.service';

@Pipe({
	name: 'idToName'
})
export class IdToNamePipe implements PipeTransform {

	constructor (private playerService: PlayerService) {}

	transform (value: any, args?: any): any {
		return this.playerService.findPlayer(value).name;
	}

}
