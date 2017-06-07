import { RandomizerService } from './randomizer.service';

describe('RandomizerService', () => {
	it('create an instance', () => {
		const service = new RandomizerService();
		expect(service).toBeTruthy();
	});
});
