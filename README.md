# LOVE HELP

## Accounts

A user must be able to sign up. They can create an account with their first name, last name, email address, and an upload button to submit a copy of a government-approved ID (approved formats: .jpg, .png, .pdf).

## Volunteering to help

Once signed in, all users see a map (via the Google Maps API with the map geolocalized reasonably to the user's current location) with markers on it indicating people in need of community help.

The markers should be colored differently for two different kinds of needs: one-time tasks (i.e., to help carry a piece of heavy furniture) or for a material need (i.e., a homeless woman on your street who needs a blanket for winter).

The map should be movable and should refresh its results, geolocalized to the new location, if dragged to show a new area.

Upon clicking a marker, information about the help request appears somewhere on the webpage (you choose where). For each help request, there should be a brief description (300 characters max), a type of request (one-time tasks or material needs, as mentioned above), a location (shown on the displayed map), and a status (fulfilled or unfulfilled, although only unfulfilled requests should be shown on the map). There should also be a button displayed somewhere on the webpage allowing users to volunteer to fulfill the selected need.

Upon clicking the button to fulfill the need, the volunteer is sent into a message flow where they can send a message to the requester directly on the platform. The requester and the volunteer can communicate this way to organize fulfillment of the need.

Once 5 separate users have clicked on the fulfillment button and sent messages to the requester, the need is no longer displayed on the site. This prevents people from putting up requests that last forever to which hundreds of people reply!

What if 1 of the 5 users doesn't actually fulfill the help request, though? If, within 24 hours, the request still hasn't been marked as fulfilled, the requester can republish it. However, if either party marks the request as fulfilled (a status associated with the request that either the requester or volunteer can modify), it cannot be republished.

## Requests

There should also be a button visible on the website allowing users to submit a request for help. You already saw the elements of a request above: there should be a brief description (300 characters max), a type of request (one-time tasks or material needs, as mentioned above), and a location (as a set of latitude and longitude coordinates). There is also a status of fulfilled or unfulfilled associated with the request, although by default, it is unfulfilled.

Each request has multiple parties associated with it: it should have one requester and one-or-more responders.

## Counter

There should be a counter for the number of unfulfilled help requests displayed on the homepage. This number should update every few seconds -- without reloading the page.
