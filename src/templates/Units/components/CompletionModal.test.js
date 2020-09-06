/* global expect */

import '@testing-library/jest-dom/extend-expect';

import { getCompletedPercent } from './CompletionModal';

const completedUnitsIds = ['1', '3', '5'],
  currentBlockIds = ['1', '3', '5', '7'],
  id = '7',
  fakeId = '12345',
  fakeCompletedUnitsIds = ['1', '3', '5', '7', '8'];

describe('<CompletionModal />', () => {
  describe('getCompletedPercent', () => {
    it('returns 0 if no units have been completed', () => {
      expect(getCompletedPercent([], currentBlockIds, fakeId)).toBe(0);
    });

    it('returns 25 if one out of four units are complete', () => {
      expect(getCompletedPercent([], currentBlockIds, currentBlockIds[1])).toBe(
        25
      );
    });

    it('returns 75 if three out of four units are complete', () => {
      expect(
        getCompletedPercent(
          completedUnitsIds,
          currentBlockIds,
          completedUnitsIds[0]
        )
      ).toBe(75);
    });

    it('returns 100 if all units have been completed', () => {
      expect(
        getCompletedPercent(completedUnitsIds, currentBlockIds, id)
      ).toBe(100);
    });

    it('returns 100 if more units have been complete than exist', () => {
      expect(
        getCompletedPercent(fakeCompletedUnitsIds, currentBlockIds, id)
      ).toBe(100);
    });
  });
});
