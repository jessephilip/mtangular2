import { IdToNamePipe } from './id-to-name.pipe';

describe('IdToNamePipe', () => {
	it('create an instance IdToNamePipe', () => {
		const pipe = new IdToNamePipe();
		expect(pipe).toBeTruthy();
	});
});
