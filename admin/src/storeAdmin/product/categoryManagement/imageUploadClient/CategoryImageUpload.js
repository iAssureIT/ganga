import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const CategoryImage = new FilesCollection({
    collectionName: 'CategoryImage',
    allowClientCode: false,
    chunkSize: 1024 * 1024
});


