export class Utils {

	/**
	 * highlights log entry data
	 * @param entry Entry
	 * @returns Highlighted text as HTML
	 */
	static highlightTextFromData(entry) {
		const highlightStart = '<em class="text-highlight">';
		const highlightEnd = '</em>';

		let replacements = [];
		let result = '';

		for (let finding of entry.data) {
			let position = finding['range'];
			replacements = replacements.concat(position);
		}

		replacements.sort(Utils.sortNumber);

		let index = 0;

		for (let i = 0; i < replacements.length; i++) {
			let pos = replacements[i];
			let htmlTag = i % 2 == 0 ? highlightStart : highlightEnd;

			result = result.concat(entry.text.substring(index, pos), htmlTag);
			index = pos;
		}

		result = result.concat(entry.text.substring(index));

		return result;
	}

	private static sortNumber(a, b) {
		return a - b;
	}
}
