export class Utils {

	/**
	 * highlights log entry data
	 * @param entry Entry
	 * @returns Highlighted text as HTML
	 */
	static highlightTextFromData(entry) {
		const highlightStart = '<em class="text-highlight">';
		const highlightEnd = '</em>';

		let result = entry.text;
		for(let finding in entry.data) {
			let position = entry.data.range;
			result = [result.slice(0, position[0]), highlightStart, result.slice(position[0])].join('');
			result = [result.slice(0, position[1]), highlightEnd, result.slice(position[1])].join('');
		}

		return result;
	}
}
