# GitHub CVs

## Intro

You think it's hard to find a good job. Have you tried finding a good developer? It's way harder.
Out of 10 CVs recruiter receives only one or two are worth having an interview with. And it takes 15-20 interviews
to finally select a suitable (in terms of experience, personality, budget) candidate. Who may just turn around
and select another offer.

From experiencing such situation came an idea. What if there was a standard way of obtaining a CV of any developer
and other way around - a way to check more details of the candidate, a way to learn more about this person. Of course
you can google it, but there must be a better way.

GitHub is a great for multiple reasons. Many developers have projects on GitHub - we could look at the GitHub profile
of a candidate and get some understanding of:

* technologies he uses
* number of projects he's working on
* how active is he on the projects
* etc.

Turns out there's a project like this already. [https://resume.github.io/](https://resume.github.io/) generates a
resume for every GitHub user (permission required). It looks pretty nice.

![https://resume.github.io/?defunkt](img/2016-05-07 02_02_12-Chris-Wanstrath-s-Resume.png)

The problem with this approach is that it's 100% generated from the GitHub information. I believe most people would
prefer to write some text about themselves first and back this information up with evidence from their GitHub profile.

## GitHub hosted CV

My suggestion is to allow developers to write their CV in markdown syntax - just the way they write comments on GitHub.
And then also display the information about this person generated from the GitHub profile on the same CV.

Let's define a standard repository name for CVs - we call them "cv". This repository should contain 
a CV of the developer in text form in a file called "me.md". Then there should be a tool for looking at this CV
and the auto-generated profile information. "http://resu.me/profile-name/" would have been a cool name, but it's
not available. Let's use "http://github-cv.me/profile-name/".

### Benefits for developers:

* Edit your CV with all the tools you already use to edit source code
* In a format familiar to you (Markdown)
* Keep the history of the changes (it's on GitHub)
* Prove your experience by your GitHub profile
* Feel free to write additional information

### Benefits for recruiters
 
* Get the latest version of the CV of the applicant (always up to date)
* Check the experience matches data collected from a GitHub profile
* At a glance - no need to search for information manually

## Example

Here's [my CV](cv.md) as an example. Feel free to fork and modify it for yourself.

## Alternatives

* [Seeveeze](https://www.seeveeze.com/de/). The professional CV editor.
* [Appolo Resume](https://apollo-resume.co/). Create impressive resumes.
* [Responsive CV](https://responsivecv.com/linkedin-resume-builder-online-free/). We help you make awesome first impression
with mobile resume along with free online CV.
* [re:Scan Chrome Ext.](https://chrome.google.com/webstore/detail/rescan/fjiopcojjjafjnfgipombdbpjimignpl?hl=en). A Chrome extension that provides a detailed report on how well-tailored an applicant's resume is to a particular job description.
