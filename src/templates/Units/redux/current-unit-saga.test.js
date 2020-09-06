/* global  expect */
import { allowBlockDonationRequestsSaga } from './current-unit-saga';
import { types as appTypes } from '../../../state';

describe('allowBlockDonationRequestsSaga', () => {
  it('should call allowBlockDonationRequests', () => {
    const gen = allowBlockDonationRequestsSaga();
    expect(gen.next().value.payload.action.type).toEqual(
      appTypes.allowBlockDonationRequests
    );
  });
});
