## TitanCheck
Hackathon Project for {Tech: Berlin} AI Hackathon

[Check it out](https://titan-check.vercel.app/)

## Description

TitanCheck is Perplexity for background checks. 
We use AI to find and assemble information about the person based on the details provided by the user, such as email, phone number, name, social media, etc.

It can be used by event organizers, HR, financial services, or in any other cases where you are worried about security and if the person is who they say they are.

We see this project only as a starting point, as you can build more complex agents to perform checks based on the public information, such as criminal records and financial statements, call the person in question, and more.


## Technical details
Next.JS frontend deployed on Vercel to send the request and show the results in a form of a report.

Flask backend deployed on Render to process the query from the user.

We use Mistral AI first to structure the information into fields, and then for each field we get additional context: 
- name and company sanctions check - run person's name and the company name through a list of sanctioned entitites in the EU
- name - we use heystack to google the person and then also assemble the information into a short summary. See [backend/google_agent.py](backend/google_agent.py)
- email - simple domain check
- linkedin - use a RapidAPI scraper to get the information from the profile
- phone number - just extracted, but we see opportunity to use something like Bland AI to also call and verify the number


## Team
- Maksym Petyak - [LinkedIn](https://www.linkedin.com/in/maksym-petyak/)
- Benjamin Wolba - [LinkedIn](https://www.linkedin.com/in/benjaminwolba/)
