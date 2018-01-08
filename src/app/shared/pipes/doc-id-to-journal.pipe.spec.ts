import {DocIdToJournalPipe} from "./doc-id-to-journal.pipe";


describe('DocIdToJournalPipe', () => {
  it('creat an instance', () => {
    const pipe = new DocIdToJournalPipe();
    expect(pipe).toBeTruthy();
  })
})
