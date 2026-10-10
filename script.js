/* ===== EDIT YOUR CONTACT DETAILS HERE (used everywhere on the site) ===== */
const CHURCH={whatsapp:"254700000000",phoneDisplay:"+254 700 000 000",email:"info@yourchurch.org"};
/* ======================================================================== */
document.documentElement.classList.add('js');
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('[data-wa]').forEach(a=>{a.href='https://wa.me/'+CHURCH.whatsapp;a.target='_blank';a.rel='noopener'});
$$('.c-phone').forEach(a=>{a.textContent=CHURCH.phoneDisplay;a.href='tel:+'+CHURCH.whatsapp});
$$('.c-email').forEach(a=>{a.textContent=CHURCH.email;a.href='mailto:'+CHURCH.email});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$$('.rv').forEach(e=>io.observe(e));

/* Countdown to Sunday service, 10:30 AM Kenya time (EAT = UTC+3) */
function nextService(){const now=Date.now(),e=new Date(now+10800000),d=(7-e.getUTCDay())%7;
 let t=Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()+d,7,30);
 if(now>t+9000000)t+=604800000;return t}
function tick(){const cd=$('#cd');if(!cd)return;
 const now=Date.now(),t=nextService(),diff=t-now,e=new Date(now+10800000),m=e.getUTCHours()*60+e.getUTCMinutes(),sun=e.getUTCDay()==0;
 const pill=$('#pill'),live=diff<=0;
 cd.hidden=live;
 if(live){pill.textContent='🔴 Service is on now – watch live below!';pill.className='pill live'}
 else if(sun&&m>=540&&m<630){pill.textContent='🧒 Sunday School is on now – service starts at 10:30';pill.className='pill'}
 else{pill.textContent='⏰ Next service: Sunday 10:30 AM';pill.className='pill'}
 if(!live){const s=Math.floor(diff/1000);
  $('#cd-d').textContent=Math.floor(s/86400);$('#cd-h').textContent=Math.floor(s%86400/3600);
  $('#cd-m').textContent=Math.floor(s%3600/60);$('#cd-s').textContent=s%60}}
tick();setInterval(tick,1000);

/* Add to calendar (weekly Sunday 10:30 AM Kenya time) */
const ics=$('#ics');if(ics)ics.onclick=()=>{const e=new Date(Date.now()+10800000),d=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()+(7-e.getUTCDay())%7,7,30));
 const f=x=>x.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z',end=new Date(d.getTime()+9000000);
 const t=['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','UID:keongo-sunday@church','DTSTAMP:'+f(new Date()),'DTSTART:'+f(d),'DTEND:'+f(end),'RRULE:FREQ=WEEKLY;BYDAY=SU','SUMMARY:Sunday Service - Keongo Full Gospel Church','END:VEVENT','END:VCALENDAR'].join('\r\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/calendar'}));a.download='keongo-sunday-service.ics';a.click()};

/* Bible verses (KJV) */
const V=[["The LORD is my shepherd; I shall not want.","Psalm 23:1"],["I was glad when they said unto me, Let us go into the house of the LORD.","Psalm 122:1"],["Come unto me, all ye that labour and are heavy laden, and I will give you rest.","Matthew 11:28"],["Suffer little children to come unto me, and forbid them not: for of such is the kingdom of God.","Mark 10:14"],["Trust in the LORD with all thine heart; and lean not unto thine own understanding.","Proverbs 3:5"],["For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.","John 3:16"]];
let vi=0;const vt=$('#vt');
function showV(){if(!vt)return;vt.textContent='“'+V[vi][0]+'”';$('#vr').textContent='— '+V[vi][1]}
if(vt){vi=Math.floor(Date.now()/864e5)%V.length;showV();$('#vn').onclick=()=>{vi=(vi+1)%V.length;showV()}}

/* Prayer request */
const msg=()=>{const n=$('#pn').value.trim()||'a friend',r=$('#pr').value.trim();return r?`Prayer request from ${n}: ${r}`:null};
if($('#pw')){$('#pw').onclick=()=>{const m=msg();if(!m)return alert('Please write your prayer request first.');window.open('https://wa.me/'+CHURCH.whatsapp+'?text='+encodeURIComponent(m))};
 $('#pe').onclick=()=>{const m=msg();if(!m)return alert('Please write your prayer request first.');location.href='mailto:'+CHURCH.email+'?subject='+encodeURIComponent('Prayer request')+'&body='+encodeURIComponent(m)}}
