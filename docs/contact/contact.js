'use strict';
const contactForm=document.querySelector('#contact-form');
contactForm.addEventListener('submit',function(event){
 event.preventDefault();
 if(!contactForm.reportValidity())return;
 const value=id=>document.getElementById(id).value.trim();
 if(['contact-name','contact-subject','contact-message'].some(id=>!value(id))){document.getElementById('contact-status').textContent='Please complete your name, subject, and message.';return;}
 const subject=value('contact-subject').replace(/[\r\n]/g,' ');
 const body='Name: '+value('contact-name')+'\r\nReply email: '+value('contact-email')+'\r\n\r\n'+value('contact-message');
 document.getElementById('contact-status').textContent='An email draft has been requested. Your message has not been sent by this page; review the draft in your email app and press Send.';
 window.location.href='mailto:theblessingvoices@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});
