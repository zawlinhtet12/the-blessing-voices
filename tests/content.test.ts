import {test} from 'node:test';import assert from 'node:assert/strict';import {validateStory,youtubeId} from '../lib/content.ts';
const draft={title:'Test draft',collection:'miracles',status:'draft',sections:{}};
test('Drafts can be saved before text and files are complete',()=>assert.equal(validateStory(draft).status,'draft'));
test('Published entries require actual Scripture, summary and story',()=>assert.throws(()=>validateStory({...draft,status:'published'}),/Scripture/));
test('Unsafe URLs and arbitrary asset paths are rejected',()=>{assert.throws(()=>validateStory({...draft,youtube:'javascript:alert(1)'}),/YouTube/);assert.throws(()=>validateStory({...draft,pdfKey:'../../secret.pdf'}),/attached file/);assert.equal(youtubeId('https://evil.example/watch?v=abcdefghijk'),'');});
test('Known YouTube formats normalize to an 11 character id',()=>{assert.equal(youtubeId('https://youtu.be/abcdefghijk'),'abcdefghijk');assert.equal(youtubeId('https://www.youtube.com/watch?v=abcdefghijk'),'abcdefghijk');});
test('Invalid collection and malformed story sections are rejected',()=>{assert.throws(()=>validateStory({...draft,collection:'other'}),/collection/);assert.throws(()=>validateStory({...draft,sections:{story:17}}),/story/);});
