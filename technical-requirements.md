# Technical Requirements
* Use a Kanban board on Github
* Make minimum of three pages, including an “About Us” page
* 2 pages that accept and process user input
* Use semantic markup wherever possible
* Appropriate page layout for desktop
* Use objects and constructors whenever possible (and appropriate)
	* Create a List constructor function
		* Properties should include “title” and an array for all it’s List Items
		* Each instance should push into an array containing all Lists
	* Create a ListItem constructor function.
		* Properties should include “content” and “completed: true/false”
		* Also create a “editing” property. On default, will be true.
	* State/user data persists across page reloads (via local storage)
		* Create saveState() and getState() functions
			* saveState() should store all list items in local storage
			* getState() should gather and parse all list items from local storage
* Final product should contain no unnecessary or commented-out code ("corpse code")
* Final product should be deployed via GitHub Pages
* Create slide desk for final project presentation on Friday
	* Should be ~15 minutes long.
	* Use colors that'll show up clearly on projector
		* No dark reds or blues on black background, etc.
	* Req'd parts of presentation
		* Introduce our project, problem domain, and team members
		* Demo our app's functionality
			* Test demo on our designed demo computer and a backup computer
	* Description of team's approach to planning and communication
	* Example of a technical obstacle or two and how we overcame
	* A portion of our app that each team member is esp. proud of.
	* Have VS Code open with source code just in case audience asks to see it
		* Don't show code unless audience asks to see it.