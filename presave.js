var H5PPresave = H5PPresave || {};

/**
 * Resolve the presave logic for the content type Summary
 *
 * @param {object} content
 * @param finished
 * @constructor
 */
H5PPresave['H5P.Summary'] = function (content, finished) {
  var presave = H5PEditor.Presave;
  var score = 0;

  if (isContentInValid()) {
    throw new presave.exceptions.InvalidContentSemanticsException('Invalid Summary Error');
  }

  score = content.summaries.length;

  presave.validateScore(score);

  if (finished) {
    finished({maxScore: score});
  }

  /**
   * Check if required parameters is present
   * @return {boolean}
   */
  function isContentInValid() {
    return !presave.checkNestedRequirements(content, 'content.summaries') || !Array.isArray(content.summaries);
  }
};
