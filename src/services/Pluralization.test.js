import {autoPluralize, pluralize, thingCountLabel} from "./Pluralization";

describe('thingCountLabel', () => {
    it('should print 2 dolphins for (2, dolphin)', () => {
        let result = thingCountLabel(2, 'dolphin');
        expect(result).toBe('2 dolphins');
    })
})

describe('autoPluralize', () => {
    it('should pluralize for 0', () => {
        let result = autoPluralize(0, 'dolphin');
        expect(result).toBe('dolphins');
    })
    it('should not pluralize for 1', () => {
        let result = autoPluralize(1, 'dolphin');
        expect(result).toBe('dolphin');
    })
    it('should pluralize for 2', () => {
        let result = autoPluralize(2, 'dolphin');
        expect(result).toBe('dolphins');
    });
});

describe('pluralize', () => {
    it('should add an s to the end of dolphin', () => {
        let result = pluralize('dolphin');
        expect(result).toBe('dolphins');
    });
    it('should add an change y to ies to the end of repository', () => {
        let result = pluralize('repository');
        expect(result).toBe('repositories');
    });
    it('should do nothing if the word ends with ing', () => {
        let result = pluralize('following');
        expect(result).toBe('following');
    })
    it('should do nothing if the word ends with ed', () => {
        let result = pluralize('starred');
        expect(result).toBe('starred');
    })
});