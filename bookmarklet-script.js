/*
SEND TO NOTES FROM THE EDGE
Bookmarklet to capture URLs, titles, and any selected text to a Google Sheets form
Credits goes to @Rich Tatum - richtatum.github.io for original source code.
Created: 04/26/2023 08:02 AM
   Modified comment braces
   Provided fallback for meta description
   Changed var to const
   Added whitespace and trim to variables
   Employed template literals
Updated: 04/28/2023 05:15 PM
*/
javascript:(function(){function sendToNotesFromTheEdge(){
   const domain=location.hostname.toString().replace(/(www\.|\.com|\.net|\.org)/g,'').replace(/^\w/,c=> c.toUpperCase());
   const utmPattern=/(\?|&)(utm_[^&=]+=[^&]*)/gi;
   const wUrl=encodeURI(location.href.replace(utmPattern,''));
   const wTitle=`${document.title} | ${domain}`;
   const formID='1FAIpQLSfx-jf_iIhPJtgE2Kw-NDJOtqfsqOBMF9lkS0_CeQF6Ik3eWA';
   const formUrl='https://docs.google.com/forms/d/e/' + formID + '/viewform';
   let description='';
   const wDescription=document.querySelector('meta[name="description"],meta[itemprop="description"]');
   if(wDescription){description=wDescription.content;}
   else{
      const ogDescription=document.querySelector('meta[property="og:description"]');
      const twitterDescription=document.querySelector('meta[name="twitter:description"]');
      if(ogDescription){description=ogDescription.content;}
      else if(twitterDescription){description=twitterDescription.content;}
      }
   const wSelection=document.getSelection().toString().replace(/\s+/g,' ').trim();
   const form=document.getElementById('notes-from-the-edge-form');
   const params=new URLSearchParams();
   params.append('entry.1339630676',wTitle);
   params.append('entry.1944091451',wUrl);
   params.append('entry.617355156',wSelection);
   if(description!==""){params.append('entry.973358481', description.replace(/\s+/g,' ').trim());}
   const url=`${formUrl}?${params.toString()}`;
   /* window.location.replace(url) */
   console.log(url);
}
sendToNotesFromTheEdge();}());
