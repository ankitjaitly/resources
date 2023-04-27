/*
SEND TO NOTES FROM THE EDGE
Bookmarklet to capture URLs, titles, and any selected text to a Google Sheets form
Credits goes to @Rich Tatum - richtatum.github.io for original source code.
Created: 04/26/2023 08:02 AM
Updated: 04/27/2023 11:38 AM
   Modified comment braces
   Provided fallback for meta description
   Changed var to const
   Added whitespace and trim to variables
   Employed template literals
Updated: 03/27/2023 8:22 AM
   Saved to GitHub
   Removed TLD deletion
*/
function sendToNotesFromTheEdge(){
   const domain=location.hostname.toString().replace(/(www\.|\.com|\.net|\.org)/g,'').replace(/^\w/,c=> c.toUpperCase());
   const utmPattern=/(\?|&)(utm_[^&=]+=[^&]*)/gi;
   const wUrl=encodeURI(location.href.replace(utmPattern,''));
   const wTitle=`${document.title} | ${domain}`;
   const formID='1EKkI_-IsmRMJnod-LLBP14dh8JBMDrmfBENcmfvnWQg';
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
   params.append('entry.623797088',wTitle);
   params.append('entry.2082543780',wUrl);
   params.append('entry.1564268661',wSelection);
   if(description!==""){params.append('entry.1626307794', description.replace(/\s+/g,' ').trim());}
   const url=`${formUrl}?${params.toString()}`;
   /* window.location.replace(url) */
   console.log(url);
}
sendToNotesFromTheEdge();

