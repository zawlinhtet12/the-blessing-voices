import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const stories=sqliteTable('stories',{
 id:text('id').primaryKey(),title:text('title').notNull(),collection:text('collection').notNull(),scripture:text('scripture').notNull().default(''),summary:text('summary').notNull().default(''),sections:text('sections').notNull().default('{}'),status:text('status').notNull().default('draft'),pdfKey:text('pdf_key'),videoKey:text('video_key'),imageKey:text('image_key'),youtube:text('youtube').notNull().default(''),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull(),
},t=>[index('stories_status_collection').on(t.status,t.collection)]);
export const uploads=sqliteTable('uploads',{key:text('key').primaryKey(),name:text('name').notNull(),mime:text('mime').notNull(),size:integer('size').notNull(),createdAt:text('created_at').notNull()});
