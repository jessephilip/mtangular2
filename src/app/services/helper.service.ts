export class HelperService {

	public createId (): number {
		return Date.now() + Math.floor(Math.random() * 1000000) + 1;
	}
}
