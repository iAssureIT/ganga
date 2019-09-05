import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const CategoryIcon = new FilesCollection({
    collectionName: 'CategoryIcon',
    allowClientCode: false,
    chunkSize: 1024 * 1024
});


