const {
  single,
  multiple,
  withDuplicates,
  withBookmarks,
} = require('./fixtures');

const {
  contractSpaces,
  isEmpty,
  parseAuthor,
  parseContent,
  parseDate,
  parseLoc,
  parseTitle,
  prependEllipsis,
  reorderNames,
  safeMatch,
  smartQuotes,
  stripBOM,
  swapJoin,
  transformQuotes,
} = require('../utils');

describe('stripBom', () => {
  it('has a sane default', () => {
    expect(stripBOM()).toBe('');
  });
});

describe('safeMatch()', () => {
  it('has a sane default', () => {
    expect(safeMatch()).toEqual([]);
  });
  it('returns matches', () => {
    expect(safeMatch('anapple', /(an)(apple)/)).toEqual(expect.arrayContaining(['anapple', 'an', 'apple']));
  });
  it('returns empty array instead of null if no match', () => {
    expect(safeMatch('anapple', /oranges/)).toEqual([]);
  });
});

describe('contractSpaces()', () => {
  it('sane default', () => {
    expect(contractSpaces()).toBe('');
  });
  it('works as expected', () => {
    expect(contractSpaces('          ')).toBe(' ');
  });
});

describe('isEmpty()', () => {
  it('sane default', () => {
    expect(isEmpty()).toBe(true);
  });
  it('works as expected', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(null)).toBe(true);
  });
});

describe('prependEllipsis()', () => {
  it('sane default', () => {
    expect(prependEllipsis()).toBe('');
  });
  it('works as expected', () => {
    expect(prependEllipsis('Starting sentence')).toBe('Starting sentence');
    expect(prependEllipsis('mid sentence')).toBe('…mid sentence');
  });
});

describe('reorderNames()', () => {
  it('sane default', () => {
    expect(reorderNames()).toBe('');
  });
  it('works as expected', () => {
    expect(reorderNames('First Last')).toBe('First Last');
    expect(reorderNames('Last, First')).toBe('First Last');
  });
});

describe('smartQuotes()', () => {
  it('sane default', () => {
    expect(smartQuotes()).toBe('');
  });
  it('works as expected', () => {
    expect(smartQuotes('"He said \'wow man\'"')).toBe('“He said ‘wow man’”');
  });
});

describe('swapJoin()', () => {
  it('sane default', () => {
    expect(swapJoin()).toBe('');
  });
  it('works as expected', () => {
    expect(swapJoin('one', 'two')).toBe('two one');
  });
});

describe('parseTitle()', () => {
  it('sane default', () => {
    expect(parseTitle()).toBe('');
  });
  it('works as expected', () => {
    expect(parseTitle('Acceptance: A Novel (The Southern Reach Trilogy) (Jeff VanderMeer)'))
      .toBe('Acceptance: A Novel (The Southern Reach Trilogy)');
  });
});

describe('parseAuthor()', () => {
  it('sane default', () => {
    expect(parseAuthor()).toBe('');
  });
  it('works as expected', () => {
    expect(parseAuthor('Acceptance: A Novel (The Southern Reach Trilogy) (Jeff VanderMeer)'))
      .toBe('Jeff VanderMeer');
    expect(parseAuthor('Songs of the Dying Earth (Dozois, Gardner;Martin, George R.R.)'))
      .toBe('Gardner Dozois, George R.R. Martin');
  });
});

describe('parseDate()', () => {
  it('sane default', () => {
    expect(parseDate()).toBe('');
  });
  it('works as expected', () => {
    expect(parseDate('- Your Highlight at location 11849-11850 | Added on Thursday, 30 April 2015 12:58:20'))
      .toEqual('2015-04-30T12:58:20.000Z');
  });
});

describe('parseLoc()', () => {
  it('sane default', () => {
    expect(parseLoc()).toBe('');
  });
  it('works as expected', () => {
    expect(parseLoc('- Your Highlight at location 11849-11850 | Added on Thursday, 30 April 2015 20:58:20'))
      .toBe('11849-11850');
  });
});

describe('parseContent()', () => {
  it('sane default', () => {
    expect(parseContent()).toBe('');
  });
  it('works as expected', () => {
    expect(parseContent('Blake says, "Where?" He\'s a man who measures words as if he had only a few given to him by Fate; too generous a syllable from his lips, and he might fall over dead.'))
      .toBe('Blake says, “Where?” He’s a man who measures words as if he had only a few given to him by Fate; too generous a syllable from his lips, and he might fall over dead.');

    expect(parseContent('and eyeing the wizard speculatively across the room. A glance was enough to tell Molloqos that she was a woman of the evening, though in her case evening was edging on toward night.'))
      .toBe('…and eyeing the wizard speculatively across the room. A glance was enough to tell Molloqos that she was a woman of the evening, though in her case evening was edging on toward night.');
  });
});

describe('transformQuotes()', () => {
  it('sane default', () => {
    expect(transformQuotes()).toEqual([]);
  });
  it('works for a single entry', () => {
    expect(transformQuotes(single)).toMatchSnapshot();
  });
  it('works for multiple entries', () => {
    expect(transformQuotes(multiple)).toMatchSnapshot();
  });
  it('removes duplicates', () => {
    expect(transformQuotes(withDuplicates)).toMatchSnapshot();
  });
  it('ignores bookmarks', () => {
    expect(transformQuotes(withBookmarks)).toMatchSnapshot();
  });
});
